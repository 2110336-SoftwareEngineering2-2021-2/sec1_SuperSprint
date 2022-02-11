import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectService } from '@src/subject/subject.service';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { ScoreService } from '../score/score.service';
@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    private readonly scoreSevice: ScoreService,
    private readonly subjectService: SubjectService,
  ) {}

  async insertTutor(
    firstName,
    lastName,
    email,
    phone,
    username,
    userType,
    gender,
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ): Promise<any> {
    const newTutor = new this.tutorModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      username: username,
      userType: userType,
      gender: gender,
      avgRating: avgRating,
      successMatch: successMatch,
      teachSubject: teachSubject,
      priceMin: priceMin,
      priceMax: priceMax,
      dutyTime: dutyTime,
    });
    await newTutor.save();
    return { tutorId: newTutor._id };
  }

  async findTutors(): Promise<Tutor[]> {
    const tutors = await this.tutorModel.find().exec();
    return tutors;
  }

  async getTutor(tutorId: string) {
    const tutor = await this.tutorModel
      .find({ _id: tutorId })
      .select({
        _id: 1,
        firstName: 1,
        lastName: 1,
      })
      .exec();
    return {
      tutor,
    };
  }

  async searchTutor(text: string): Promise<Tutor[]> {
    const tutors = await this.tutorModel
      .aggregate()
      .search({
        index: 'tutor-search',
        text: {
          query: text,
          path: {
            wildcard: '*',
          },
        },
      })
      .lookup({
        from: 'subjects',
        localField: 'teachSubject',
        foreignField: '_id',
        as: 'teachSubject',
      });

    return tutors;
  }

  async recommendTutor(subjects: Array<string>): Promise<Tutor[]> {
    const results: Tutor[] = [];
    for (const sIndex in subjects) {
      const subjectId = subjects[sIndex];
      const tutorIds = await this.tutorModel
        .find({ teachSubject: { $in: [subjectId] } })
        .exec();
      const result: [number, Tutor][] = [];
      for (const tIndex in tutorIds) {
        const tutor = tutorIds[tIndex];
        const score = await this.calculateCredibility(tutor, subjectId);
        result.push([score, tutor]);
      }
      const sortedResult = result.sort((n1, n2) => {
        if (n1[0] > n2[0]) return -1;
        else if (n1[0] < n2[0]) return 1;
        return 0;
      });
      for (
        let i = 0, length = Math.min(sortedResult.length, 1);
        i < length;
        i++
      ) {
        results.push(sortedResult[i][1]);
      }
    }
    return results;
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
    const subject = await this.subjectService.findByTitleAndLevel(
      subjectName,
      level,
    );

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

    const tutors = await this.tutorModel
      .find({
        $and: [
          { teachSubject: { $in: [subject.id] } },
          { price: { $gte: priceMin } }, //ราคาเด็ก ครอบ ราคาติวเตอร์
          { price: { $lte: priceMax } },
          //{ 'dutyTime.start': { $lte: datetimeFrom } },
          //{ 'dutyTime.end': { $gte: datetimeTo } },
          // {
          //   dutyTime: {
          //     $elemMatch: {
          //       start: { $lte: datetimeFrom.toISOString() },
          //       end: { $gte: datetimeTo.toISOString() },
          //     },
          //   },
          // },
        ],
      })
      .exec();

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
        //console.log(tutorTimeFrom <= studentTimeFrom);
        //console.log(tutorTimeTo >= studentTimeTo);
        if (tutorTimeFrom <= studentTimeFrom && tutorTimeTo >= studentTimeTo) {
          oncondition = true;
          break;
        }
      }
      return oncondition;
    });

    const tutor_send = await Promise.all(
      tutor_temp.map(async (e) => {
        const score = await this.calculateCredibility(e, subject.id);

        const {
          _id,
          firstName,
          lastName,
          username,
          gender,
          avgRating,
          // teachSubject,
          priceMin,
          priceMax,
          dutyTime,
        } = e;

        return {
          _id,
          firstName,
          lastName,
          username,
          gender,
          avgRating,
          // teachSubject,
          priceMin,
          priceMax,
          dutyTime,
          score: score,
        };
      }),
    );

    return tutor_send;
  }

  async updateTutor(
    id,
    firstName,
    lastName,
    email,
    phone,
    username,
    userType,
    gender,
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ) {
    const updateTutor = await this.tutorModel.findById(id).exec();

    if (firstName) {
      updateTutor.firstName = firstName;
    }
    if (lastName) {
      updateTutor.lastName = lastName;
    }
    if (email) {
      updateTutor.email = email;
    }
    if (phone) {
      updateTutor.phone = phone;
    }
    if (username) {
      updateTutor.username = username;
    }
    if (userType) {
      updateTutor.userType = userType;
    }
    if (gender) {
      updateTutor.gender = gender;
    }
    if (avgRating) {
      updateTutor.avgRating = avgRating;
    }
    if (successMatch) {
      updateTutor.successMatch = successMatch;
    }
    if (teachSubject) {
      updateTutor.teachSubject = teachSubject;
    }
    if (priceMin) {
      updateTutor.priceMin = priceMin;
    }
    if (priceMax) {
      updateTutor.priceMax = priceMax;
    }
    if (dutyTime) {
      updateTutor.dutyTime = dutyTime;
    }

    await updateTutor.save();
    return 'Update Complete';
  }

  private async findTutor(tutorId: string): Promise<Tutor> {
    let tutor;
    try {
      tutor = await this.tutorModel.findById(tutorId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tutor.');
    }
    if (!tutor) throw new NotFoundException('Could not find tutor.');
    return tutor;
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
