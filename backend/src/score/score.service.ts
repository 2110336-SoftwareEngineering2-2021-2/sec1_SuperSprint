import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Score } from '../models/score.model';
import { S3Service } from '@src/services/S3Sevices.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
    private readonly s3Service: S3Service,
  ) {}

  async getScore(tutor: Tutor, sId: string) {
    const res = await this.findScore(tutor, sId);
    return res;
  }

  private async findScore(tutor: Tutor, sId: string): Promise<number> {
    let score;
    const tId = tutor._id;
    try {
      score = await this.scoreModel
        .find({ tutorId: tId, subjectId: sId })
        .lean();
    } catch (error) {
      throw new NotFoundException('Could not find score.');
    }
    if (score.length === 0) {
      return 0;
    }
    return score.currentScore;
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
    const score = await this.scoreModel.findOne({
      tutorId: tutorId,
      subjectId: subjectId,
    });
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
}
