import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { ScoreService } from '../score/score.service';
@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    private readonly scoreSevice: ScoreService,
  ) {}

  async insertTutor(
    firstName,
    lastName,
    email,
    phone,
    username,
    userType,
    gender,
    tutorId,
    avgRating,
    successMatch,
    teachSubject,
  ): Promise<string> {
    const newTutor = new this.tutorModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      username: username,
      userType: userType,
      gender: gender,
      tutorId: tutorId,
      avgRating: avgRating,
      successMatch: successMatch,
      teachSubject: teachSubject,
    });
    await newTutor.save();
    return 'Inserted tutor';
  }

  async findTutors(): Promise<Tutor[]> {
    const tutors = await this.tutorModel.find().exec();
    return tutors;
  }

  async getTutor(tutorId: string) {
    const tutor = await this.findTutor(tutorId);
    return {
      tutorId: tutor.tutorId,
      firstName: tutor.firstName,
      lastName: tutor.lastName,
    };
  }

  async recommendTutor(subjects: Array<string>): Promise<Tutor[]> {
    let results: [Tutor];
    for (const subjectId in subjects) {
      const tutorIds = this.tutorModel
        .find({ teachSubject: { $in: [subjectId] } })
        .exec();
      for (const tutorId in tutorIds) {
        const tutor = await this.findTutor(tutorId);
        let result: [number, Tutor][];
        const score = await this.calculateCredibility(tutor, subjectId);
        result.push([score, tutor]);
        const sortedResult = result.sort((n1, n2) => {
          if (n1[0] > n2[0]) return -1;
          if (n1[0] < n2[0]) return 1;
          return 0;
        });
        for (
          let i = 0, length = Math.min(sortedResult.length, 10);
          i < length;
          i++
        ) {
          results.push(sortedResult[i][1]);
        }
      }
    }
    return results;
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
    sId: string,
  ): Promise<number> {
    const score = await this.scoreSevice.getScore(tutor, sId);
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
