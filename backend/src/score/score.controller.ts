import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}
  // constructor(private readonly tutorService: TutorService) {}
  //   @Get()
  //   async getSubject(@Body('subjectId') subjectId: string) {
  //     const name = await this.subjectService.getName(subjectId);
  //     return { id: name };
  //   }
  @Post()
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
