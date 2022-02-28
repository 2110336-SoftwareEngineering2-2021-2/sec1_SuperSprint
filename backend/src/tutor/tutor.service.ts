import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectService } from '@src/subject/subject.service';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { ScoreService } from '../score/score.service';
import { S3Service } from '@src/services/S3Sevices.service';
@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
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
      .limit(10)
      .match({
        count: { $ne: 0 },
      });

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
    const tutor = await this.tutorModel.findById(id);
    const { password, ...result } = tutor;
    return result;
  }

  async matchTutor(
    subjectName: string,
    level: string,
    priceMin: number,
    priceMax: number,
    availabilityStudent: {
      availabilityDate: string;
      availabilityTimeFrom: string;
      availabilityTimeTo: string;
    }[],
  ) {
    console.log(subjectName, level, priceMin, priceMax, availabilityStudent);
    const subject = await this.subjectService.findByTitleAndLevel(
      subjectName,
      level,
    );

    console.log(subject);

    const datetimeFrom = new Date(
      availabilityStudent[0].availabilityDate +
        'T' +
        availabilityStudent[0].availabilityTimeFrom,
    );
    datetimeFrom.setHours(datetimeFrom.getHours() + 7);
    const datetimeTo = new Date(
      availabilityStudent[0].availabilityDate +
        'T' +
        availabilityStudent[0].availabilityTimeTo,
    );
    datetimeTo.setHours(datetimeTo.getHours() + 7);
    console.log(datetimeFrom, datetimeTo);

    const tutors = await this.tutorModel
      .find({
        $and: [
          { teachSubject: { $in: [subject._id] } },
          { priceMin: { $gte: priceMin } }, //ราคาเด็ก ครอบ ราคาติวเตอร์
          { priceMax: { $lte: priceMax } },
        ],
      })
      .populate('teachSubject')
      .lean();

    console.log(tutors);
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
        const score = await this.calculateCredibility(e, subject._id);
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
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ) {
    const foundUsername = await this.tutorModel
      .findOne({ username: username })
      .lean();
    const foundEmail = await this.tutorModel.findOne({ email: email }).lean();

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
    await this.s3Service.deleteFile(tutor.profileUrl);
    const imageUrl = await this.s3Service.uploadFile(username, image);

    tutor.firstName = firstName;
    tutor.lastName = lastName;
    tutor.gender = gender;
    tutor.profileUrl = imageUrl;
    tutor.avgRating = avgRating;
    tutor.successMatch = successMatch;
    tutor.teachSubject = teachSubject;
    tutor.priceMin = priceMin;
    tutor.priceMax = priceMax;
    tutor.dutyTime = dutyTime;

    const { password, ...updatedTutor } = await tutor.save();

    return { message: 'successfully update', tutor: updatedTutor };
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
    const score = await this.scoreSevice.getScore(tutor, subjectId);
    const tutorAvgRating = tutor.avgRating;
    const tutorSuccessMatch = tutor.successMatch;
    const weightScore = 0.33;
    const weightAvgRating = 0.33;
    const weightSuccessMatch = 0.34;
    return (
      score * weightScore +
      tutorAvgRating * weightAvgRating +
      tutorSuccessMatch * weightSuccessMatch
    );
  }
}
