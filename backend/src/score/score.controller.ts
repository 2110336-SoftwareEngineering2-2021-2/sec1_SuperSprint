import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Score } from '../models/score.model';

@ApiTags('score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('create')
  @ApiBody({ type: Score })
  async addScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
    @Body('score') score: number,
    @Body('maxScore') maxScore: number,
    @Body('year') year: number,
  ) {
    const newScore = await this.scoreService.insertScore(
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
    );
    return { id: newScore };
  }
}
