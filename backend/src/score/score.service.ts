import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Score } from '../models/score.model';
import { Subject } from '../models/subject.model';
import { S3Service } from '@src/services/S3Sevices.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    @InjectModel('Subject') private readonly subjectModel: Model<Subject>,
    private readonly s3Service: S3Service,
  ) {}

  async getScore(tutorId: string, sId: string) {
    const res = await this.findScore(tutorId, sId);
    return res;
  }

  private async findScore(tId: string, sId: string): Promise<Score> {
    let score;
    try {
      score = await this.scoreModel
        .findOne({ tutorId: tId, subjectId: sId })
        .lean();
      if (!score) {
        return null;
        // return 0;
        // throw new NotFoundException('Could not find score.');
      }
    } catch (error) {
      throw new BadRequestException(`get score from tutor ${tId} failed`);
    }

    return score;
  }
  async insertScore(
    tutorId: string,
    subjectId: string,
    currentScore: number,
    maxScore: number,
    year: number,
    image,
  ): Promise<any> {
    // console.log(tutorId);
    let imageUrl;
    try {
      if (image) {
        imageUrl = await this.s3Service.uploadFile(tutorId + subjectId, image);
      } else {
        imageUrl =
          'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
      }
    } catch (err) {
      throw err;
    }
    const status = 'approved';
    const newScore = new this.scoreModel({
      tutorId,
      subjectId,
      currentScore,
      imageUrl,
      maxScore,
      year,
      status,
    });
    await newScore.save();
    return newScore.id;
  }
  async deleteScore(tutorId: string, subjectId: string) {
    const score = await this.scoreModel.findOne({
      tutorId: tutorId,
      subjectId: subjectId,
    });
    // console.log(tutorId);
    const imageUrl = score.imageUrl;
    await this.scoreModel.deleteOne({ tutorId: tutorId, subjectId: subjectId });
    await this.s3Service.deleteFile(imageUrl);
    return score._id;
  }

  async editScore(
    tutorId: string,
    subjectId: string,
    currentScore: number,
    maxScore: number,
    year: number,
    image,
  ) {
    const score = await this.scoreModel.findOne({ tutorId, subjectId });

    if (image) {
      await this.s3Service.deleteFile(score.imageUrl);
      score.imageUrl = await this.s3Service.uploadFile(
        score.tutorId + score.subjectId,
        image,
      );
    }
    

    score.tutorId = tutorId || score.tutorId;
    score.subjectId = subjectId || score.subjectId;
    score.currentScore = currentScore || score.currentScore;
    score.maxScore = maxScore || score.maxScore;
    score.year = year || score.year;

    await score.save();
    return { scoreId: score._id };
  }

  async getAllScore(tutorId: string) {
    const scores = await this.scoreModel
      .find({ tutorId: tutorId })
      .populate('subjectId');

    return scores;
  }

  async getTutorSubjectsScore(tutorId: string) {
    const tutor = await this.tutorModel.findById(tutorId).lean();
    const teachSubject = tutor.teachSubject;
    const res = [];
    // console.log(123);
    await Promise.all(
      teachSubject.map(async (subjectId) => {
        const subject = await this.subjectModel.findById(subjectId).lean();
        // console.log(subject.title);
        const score = await this.scoreModel
          .findOne({ tutorId, subjectId })
          .lean(); // score , null {pat  : null , pat2: score}
        // {subject1 : score1, subject2: score2 }
        // console.log(score);
        if (score && score.status === 'approved') {
          // console.log(0);
          res.push({
            subjectId: subject._id,
            subjectName: subject.title,
            level: subject.level,
            currentScore: score.currentScore,
            maxScore: score.maxScore,
            scoreImage: score.imageUrl,
          });
        } else {
          // console.log(1);
          res.push({
            subjectId: subject._id,
            subjectName: subject.title,
            level: subject.level,
            currentScore: null,
            maxScore: subject.maxScore,
            scoreImage: null,
          });
          // console.log(res);
        }
      }),
    );
    // console.log(res);
    return res;
  }
}
