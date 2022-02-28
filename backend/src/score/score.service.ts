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
    score: number,
    maxScore: number,
    year: number,
  ): Promise<any> {
    const newScore = new this.scoreModel({
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
    });
    await newScore.save();
    return { scoreId: newScore.id };
  }
}
