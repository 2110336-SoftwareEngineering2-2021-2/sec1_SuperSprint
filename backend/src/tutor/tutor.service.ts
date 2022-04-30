import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectService } from '@src/subject/subject.service';
import { Model, Mongoose } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { ScoreService } from '../score/score.service';
import { S3Service } from '@src/services/S3Sevices.service';
import { Subject } from '../models/subject.model';
import { Score } from '../models/score.model';
@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    @InjectModel('Subject') private readonly subjectModel: Model<Subject>,
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
    private readonly scoreSevice: ScoreService,
    private readonly subjectService: SubjectService,
    private readonly s3Service: S3Service,
  ) {}

  async getTutors(): Promise<Tutor[]> {
    const tutors = await this.tutorModel.find();
    return tutors;
  }

  async searchTutor(text: string): Promise<{ tutorList: Array<Tutor> }> {
    const regex = new RegExp(`${text.split(' ').join('|')}`, 'i');
    console.log(text);
    const tutors = await this.tutorModel
      .aggregate()
      .lookup({
        from: 'subjects',
        localField: 'teachSubject',
        foreignField: '_id',
        as: 'teachSubject',
      })
      .addFields({
        count: {
          $sum: {
            $add: [
              {
                $size: {
                  $regexFindAll: {
                    input: { $toString: '$firstName' },
                    regex: regex,
                  },
                },
              },
              {
                $size: {
                  $regexFindAll: {
                    input: { $toString: '$lastName' },
                    regex: regex,
                  },
                },
              },
              {
                $size: {
                  $regexFindAll: {
                    input: {
                      $reduce: {
                        input: {
                          $concatArrays: '$teachSubject.title',
                        },
                        initialValue: '',
                        in: {
                          $concat: ['$$value', ' ', '$$this'],
                        },
                      },
                    },
                    regex: regex,
                  },
                },
              },
              {
                $size: {
                  $regexFindAll: {
                    input: {
                      $reduce: {
                        input: {
                          $concatArrays: '$teachSubject.level',
                        },
                        initialValue: '',
                        in: {
                          $concat: ['$$value', ' ', '$$this'],
                        },
                      },
                    },
                    regex: regex,
                  },
                },
              },
            ],
          },
        },
      })
      .sort({
        count: -1,
      })
      .match({
        count: { $ne: 0 },
      });
    console.log('searcg', tutors);
    return { tutorList: tutors };
  }

  async recommendTutor(subjects: Array<string>): Promise<any> {
    const results: [number, Tutor][] = [];
    for (const sIndex in subjects) {
      const subjectId = subjects[sIndex];
      const tutorIds = await this.tutorModel
        .find({ teachSubject: { $in: [subjectId] } })
        .populate('teachSubject')
        .lean();
      const result: [number, Tutor][] = [];
      for (const tIndex in tutorIds) {
        const tutor = tutorIds[tIndex];
        const score = await this.calculateCredibility(tutor, subjectId);
        console.log(tutorIds[tIndex]);
        result.push([score, tutor]);
      }
      const sortedResult = result.sort((n1, n2) => {
        if (n1[0] > n2[0]) return -1;
        else if (n1[0] < n2[0]) return 1;
        return 0;
      });
      for (
        let i = 0, length = Math.min(sortedResult.length, 10);
        i < length;
        i++
      ) {
        results.push(sortedResult[i]);
      }
    }
    const sortedResults = results.sort((n1, n2) => {
      if (n1[0] > n2[0]) return -1;
      else if (n1[0] < n2[0]) return 1;
      return 0;
    });

    return sortedResults.map((e) => {
      // console.log(e);
      const { password, ...result } = e[1];
      return { ...result, score: e[0] };
    });
  }

  async getTutorById(id) {
    console.log('test', id);
    // const tutor = await this.tutorModel
    //   .aggregate()
    //   .lookup({
    //     from: 'subjects',
    //     localField: 'teachSubject',
    //     foreignField: '_id',
    //     as: 'teachSubject',
    //   })
    //   .match({
    //     _id: { $in: id },
    //   });
    const tutor = await this.tutorModel
      .findById(id)
      .populate('teachSubject')
      .lean();

    console.log('tutor', tutor);
    // console.log('tutor', tutor);
    // const { password, ...result } = tutor;
    return tutor;
  }

  async matchTutor(
    subjectId: string,
    priceMin: number,
    priceMax: number,
    availabilityStudent: {
      avail_time_from: string;
      avail_time_to: string;
    }[],
  ) {
    // console.log(subjectName, level, priceMin, priceMax, availabilityStudent);
    // const subject = await this.subjectService.findByTitleAndLevel(
    //   subjectName,
    //   level,
    // );

    console.log(availabilityStudent);

    const datetimeFrom = new Date(availabilityStudent[0].avail_time_from);

    // datetimeFrom.setHours(datetimeFrom.getHours() + 7);
    const datetimeTo = new Date(availabilityStudent[0].avail_time_to);
    // datetimeTo.setHours(datetimeTo.getHours() + 7);
    console.log(datetimeFrom, datetimeTo);

    const tutors = await this.tutorModel
      .find({
        $and: [
          { teachSubject: { $in: [subjectId] } },
          { priceMin: { $gte: priceMin } }, //ราคาเด็ก ครอบ ราคาติวเตอร์
          { priceMax: { $lte: priceMax } },
        ],
      })
      .populate('teachSubject')
      .lean();

    console.log('------------------', availabilityStudent);
    //เวลาว่างติวเตอร์ คร่อม เวลาว่างเด็ก
    const tutor_temp = tutors.filter((e) => {
      let oncondition = false;
      const times = e.dutyTime;
      let studentTimeFrom;
      let studentTimeTo;
      let tutorTimeFrom;
      let tutorTimeTo;
      for (let i = 0; i < times.length; i++) {
        studentTimeFrom = datetimeFrom;
        studentTimeTo = datetimeTo;
        tutorTimeFrom = times[i].start;
        tutorTimeTo = times[i].end;

        console.log(1, tutorTimeFrom <= studentTimeFrom);
        console.log(2, tutorTimeTo >= studentTimeTo);

        if (tutorTimeFrom <= studentTimeFrom && tutorTimeTo >= studentTimeTo) {
          oncondition = true;
          break;
        }
      }
      return oncondition;
    });

    const tutor_send = await Promise.all(
      tutor_temp.map(async (e) => {
        const score = await this.calculateCredibility(e, subjectId);
        const { password, ...result } = e;
        return { ...result, score };
      }),
    );
    return { tutorList: tutor_send };
  }

  async updateTutor(
    id,
    firstName,
    lastName,
    email,
    phone,
    username,
    gender,
    image,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ) {
    const foundUsername = await this.tutorModel
      .findOne({ username: username, _id: { $ne: id } })
      .lean();
    const foundEmail = await this.tutorModel
      .findOne({ email: email, _id: { $ne: id } })
      .lean();
    console.log(foundUsername, foundEmail);

    if (foundUsername && foundEmail) {
      throw new ForbiddenException('duplicate username and email');
    }
    if (foundUsername) {
      throw new ForbiddenException('duplicate username');
    }
    if (foundEmail) {
      throw new ForbiddenException('duplicate email');
    }

    const tutor = await this.tutorModel.findById(id);

    if (image) {
      await this.s3Service.deleteFile(tutor.profileUrl);
      tutor.profileUrl = await this.s3Service.uploadFile(username, image);
    }
    // await this.s3Service.deleteFile(tutor.profileUrl);
    // const imageUrl = await this.s3Service.uploadFile(username, image);

    tutor.firstName = firstName || tutor.firstName;
    tutor.lastName = lastName || tutor.lastName;
    tutor.gender = gender || tutor.gender;

    tutor.priceMin = priceMin || tutor.priceMin;
    tutor.priceMax = priceMax || tutor.priceMax;
    if (teachSubject) {
      tutor.teachSubject = teachSubject || tutor.teachSubject;
      const existingScore = await this.scoreModel.find({ tutorId: id }).lean();
      console.log('!!!!!!!!!!!!!', existingScore);
      await Promise.all(
        existingScore.map(async (s) => {
          // console.log('what is s',s);
          // console.log('what is teachSubject' , teachSubject)
          if (
            teachSubject.findIndex((subjectId) => subjectId == s.subjectId) ===
            -1
          ) {
            await this.scoreSevice.deleteScore(id, s.subjectId);
            // await this.scoreSevice.insertScore(
            //   id,
            //   s.subjectId,
            //   0,
            //   s.maxScore,
            //   null,
            //   null,
            // );
          }
        }),
      );
      await Promise.all(
        teachSubject.map(async (subjectId) => {
          const subject = await this.subjectModel.findById(subjectId).lean();
          const score = await this.scoreSevice.getScore(id, subjectId);
          if (!score) {
            await this.scoreSevice.insertScore(
              id,
              subjectId,
              0,
              subject.maxScore,
              null,
              null,
            );
          }
        }),
      );
    }

    tutor.phone = phone || tutor.phone;
    tutor.username = username || tutor.username;
    tutor.email = email || tutor.email;
    tutor.dutyTime = [];

    await tutor.save();

    if (dutyTime) {
      // console.log('dutyTime', dutyTime);
      for (const element of dutyTime) {
        await this.addDutyTimeDateTime(tutor._id, element.start, element.end);
      }
      console.log('hello');
      // tutor.dutyTime = dutyTime;
    }

    console.log(dutyTime);

    const { password, ...updatedTutor } = await tutor.save();

    return { message: 'successfully update', tutor: updatedTutor };
  }

  async addDutyTime(
    tutorId: string,
    addDate: string,
    addStartTime: string,
    addEndTime: string,
  ) {
    const datetimeStart = new Date(addDate + 'T' + addStartTime);
    datetimeStart.setHours(datetimeStart.getHours() + 7);

    const datetimeEnd = new Date(addDate + 'T' + addEndTime);
    datetimeEnd.setHours(datetimeEnd.getHours() + 7);

    const tutor = await this.tutorModel.findById(tutorId);
    const dutyTime = tutor.dutyTime;

    const startFound = dutyTime.findIndex(
      (element) => element.end.toString() === datetimeStart.toString(),
    );

    const endFound = dutyTime.findIndex(
      (element) => element.start.toString() === datetimeEnd.toString(),
    );

    if (startFound !== -1 && endFound !== -1) {
      // ชิดซ้ายขวา
      dutyTime[startFound].end = dutyTime[endFound].end;
      dutyTime.splice(endFound, 1);
      // dutyTime[endFound].end = dutyTime[startFound].end;
      // dutyTime.splice(startFound, 1);
    } else if (startFound !== -1 && endFound === -1) {
      // ตัวแทรกไปชิดซ้ายตัวที่มีอยู่ -> แก้ end ของตัวที่มีอยู่
      dutyTime[startFound].end = datetimeEnd;
    } else if (startFound === -1 && endFound !== -1) {
      // ชิดขวา
      dutyTime[endFound].start = datetimeStart;
    } else {
      // ไม่ชิดเลย
      dutyTime.push({ start: datetimeStart, end: datetimeEnd });
      dutyTime.sort((a, b) => +a.start - +b.start);
    }
    await tutor.save();
    return { message: 'successfully add duty time', dutyTime: tutor.dutyTime };
  }

  async addDutyTimeDateTime(
    tutorId: string,
    addStartDate: string,
    addEndDate: string,
  ) {
    const datetimeStart = new Date(addStartDate);
    const datetimeEnd = new Date(addEndDate);

    const tutor = await this.tutorModel.findById(tutorId);
    const dutyTime = tutor.dutyTime; // []

    console.log('hiiiiiiiiiiiiii');
    if (dutyTime.length === 0) {
      dutyTime.push({ start: datetimeStart, end: datetimeEnd });
    } else {
      const startFound = dutyTime.findIndex(
        (element) => element.end.toString() === datetimeStart.toString(),
      );

      const endFound = dutyTime.findIndex(
        (element) => element.start.toString() === datetimeEnd.toString(),
      );

      if (startFound !== -1 && endFound !== -1) {
        // ชิดซ้ายขวา
        dutyTime[startFound].end = dutyTime[endFound].end;
        dutyTime.splice(endFound, 1);
        // dutyTime[endFound].end = dutyTime[startFound].end;
        // dutyTime.splice(startFound, 1);
      } else if (startFound !== -1 && endFound === -1) {
        // ตัวแทรกไปชิดซ้ายตัวที่มีอยู่ -> แก้ end ของตัวที่มีอยู่

        dutyTime[startFound].end = datetimeEnd;
      } else if (startFound === -1 && endFound !== -1) {
        // ชิดขวา
        dutyTime[endFound].start = datetimeStart;
      } else {
        // ไม่ชิดเลย
        dutyTime.push({ start: datetimeStart, end: datetimeEnd });
        dutyTime.sort((a, b) => +a.start - +b.start);
      }
    }

    await this.tutorModel.findByIdAndUpdate(tutorId, { dutyTime });
    console.log('dutyTime of tutor', tutor.dutyTime);
    return { message: 'successfully add duty time', dutyTime: tutor.dutyTime };
  }

  private async findTutor(tutorId: string): Promise<Tutor> {
    let tutor;
    try {
      tutor = await this.tutorModel.findById(tutorId).lean();
    } catch (error) {
      throw new NotFoundException('Could not find tutor.');
    }
    if (!tutor) throw new NotFoundException('Could not find tutor.');
    const { password, ...result } = tutor;
    return result;
  }

  private async calculateCredibility(
    tutor: Tutor,
    subjectId: string,
  ): Promise<number> {
    const score = await this.scoreSevice.getScore(tutor._id, subjectId);
    let tutorScore;
    if (!score) tutorScore = 0;
    else tutorScore = score.currentScore;
    const tutorAvgRating = tutor.avgRating;
    const tutorSuccessMatch = tutor.successMatch;
    const weightScore = 0.33;
    const weightAvgRating = 0.33;
    const weightSuccessMatch = 0.34;
    return (
      tutorScore * weightScore +
      tutorAvgRating * weightAvgRating +
      tutorSuccessMatch * weightSuccessMatch
    );
  }
}
