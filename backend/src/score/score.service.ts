import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Score } from '../models/score.model';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
  ) {}

  async getScore(tutor: Tutor, sId: string) {
    const res = await this.findScore(tutor, sId);
    return res.score;
  }

  private async findScore(tutor: Tutor, sId: string): Promise<Score> {
    let score;
    const tId = tutor.tutorId;
    try {
      score = await this.scoreModel
        .find({ tutorId: tId, subjectId: sId })
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find score.');
    }
    if (!score) {
      throw new NotFoundException('Could not find score.');
    }
    return score;
  }

  async insertScore(
    tutorId: string,
    subjectId: string,
    score: number,
    maxScore: number,
    year: number,
  ) {
    const newScore = new this.scoreModel({
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
    });
    const result = await newScore.save();
    return result.id as string;
  }
}
