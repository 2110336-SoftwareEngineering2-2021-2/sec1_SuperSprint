import {
  Controller,
  Body,
  Get,
  Post,
  Injectable,
  UploadedFile,
  UseGuards,
  Delete,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Score } from '../models/score.model';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('score')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: Score })
  async addScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
    @Body('score') score: number,
    @Body('maxScore') maxScore: number,
    @Body('year') year: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(tutorId);
    const newScore = await this.scoreService.insertScore(
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
      image,
    );
    return { id: newScore };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
  ) {
    // console.log(tutorId);
    const scoreId = await this.scoreService.deleteScore(tutorId, subjectId);
    return { deletedScore: scoreId };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch('edit')
  @ApiBody({ type: Score })
  @UseGuards(AuthGuard('jwt'))
  async editScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
    @Body('score') score: number,
    @Body('maxScore') maxScore: number,
    @Body('year') year: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const scoreId = await this.scoreService.editScore(
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
      image,
    );
    return scoreId;
  }
}
