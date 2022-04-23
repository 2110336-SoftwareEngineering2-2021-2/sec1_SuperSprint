import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  Param,
  Injectable,
  UploadedFile,
  UseGuards,
  Delete,
  UseInterceptors,
  Patch,
  Request,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { Score } from '../models/score.model';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthUser } from '@src/auth/auth.decorator';
@ApiTags('score')
@ApiBearerAuth()
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'create new score',
  })
  @ApiBody({
    schema: {
      properties: {
        tutorId: { type: 'string', example: '621c818daefa29db6f3e806f' },
        subjectId: { type: 'string', example: '62072bfd96edc906154249b1' },
        score: { type: 'number', example: 300 },
        maxScore: { type: 'number', example: 300 },
        year: { type: 'number', example: 2022 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6236aba956e2c3c18ccb0eed',
        },
      },
    },
  })
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
  @ApiOperation({
    summary: 'Delete score by tutorId and subjectId',
  })
  @Delete('delete')
  @ApiBody({
    schema: {
      properties: {
        tutorId: { type: 'string', example: '621c818daefa29db6f3e806f' },
        subjectId: { type: 'string', example: '62072bfd96edc906154249b1' },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '6236aba956e2c3c18ccb0eed',
        },
      },
    },
  })
  async deleteScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
  ) {
    const scoreId = await this.scoreService.deleteScore(tutorId, subjectId);
    return { deletedScore: scoreId };
  }

  @UseInterceptors(FileInterceptor('scoreImage'))
  @ApiOperation({
    summary: 'Update score',
  })
  @Patch('edit')
  @ApiBody({ type: Score })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        scoreId: {
          type: 'string',
          example: '6236aba956e2c3c18ccb0eed',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  async editScore(
    @Body('tutorId') tutorId: string,
    @Body('subjectId') subjectId: string,
    @Body('score') score: number,
    @Body('maxScore') maxScore: number,
    @Body('year') year: number,
    @UploadedFile() scoreImage: Express.Multer.File,
  ) {
    const scoreId = await this.scoreService.editScore(
      tutorId,
      subjectId,
      score,
      maxScore,
      year,
      scoreImage,
    );
    return scoreId;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get score by tutorId and subjectId',
  })
  @ApiQuery({
    name: 'tutorId',
    required: true,
    type: 'string',
    example: '621c818daefa29db6f3e806f',
  })
  @ApiQuery({
    name: 'subjectId',
    required: true,
    type: 'string',
    example: '6236aba956e2c3c18ccb0eed',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        subject: {
          type: 'string',
          example: '123456',
        },
        score: {
          type: 'number',
          example: 300,
        },
        maxScore: {
          type: 'number',
          example: 300,
        },
        scoreImage: {
          type: 'string',
          example:
            'https://skyandtelescope.org/wp-content/uploads/Earth-from-Mars_m.jpg',
        },
      },
    },
  })
  @Get('')
  async getScore(
    @Query('tutorId') tutorId: string,
    @Query('subjectId') subjectId: string,
  ) {
    const score = await this.scoreService.getScore(tutorId, subjectId);
    return {
      subject: score.subjectId,
      score: score.currentScore,
      maxScore: score.maxScore,
      scoreImage: score.imageUrl,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get all scores by tutorId',
  })
  @ApiQuery({
    name: 'tutorId',
    required: true,
    type: 'string',
    example: '621c818daefa29db6f3e806f',
  })
  @ApiOkResponse({ type: Score })
  @Get('scores/:tutorId')
  async getAllScore(@Param('tutorId') tutorId: string) {
    const scores = await this.scoreService.getTutorSubjectsScore(tutorId);
    return {
      scores: scores,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get all pending scores',
  })
  @ApiOkResponse({ type: [Score] })
  @Get('/getAllPendingScore')
  async getAllPendingScore(@AuthUser() user: any) {
    const score = await this.scoreService.getAllPendingScore(user);
    return { score: score };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get score by scoreId ',
  })
  @ApiParam({ name: 'scoreId', example: '6236aba956e2c3c18ccb0eed' })
  @ApiOkResponse({
    type: Score,
  })
  @Get('/:scoreId')
  async getScoreById(@Param('scoreId') scoreId: string) {
    const score = await this.scoreService.getScoreById(scoreId);
    return { score: score };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Approve score which has tutorId and subjectId',
  })
  @ApiOkResponse({ type: Score })
  @Patch('/:tutorId/:subjectId/approve')
  async approveScore(
    @Param('tutorId') tutorId: string,
    @Param('subjectId') subjectId: string,
    @Body('adminId') adminId: string,
    @AuthUser() user: any,
  ) {
    const score = await this.scoreService.validateScore(
      tutorId,
      subjectId,
      'approve',
      adminId,
      user,
    );
    return { score: score };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Reject score which has tutorId and subjectId',
  })
  @ApiOkResponse({ type: Score })
  @Patch('/:tutorId/:subjectId/reject')
  async rejectScore(
    @Param('tutorId') tutorId: string,
    @Param('subjectId') subjectId: string,
    @Body('adminId') adminId: string,
    @AuthUser() user: any,
  ) {
    const score = await this.scoreService.validateScore(
      tutorId,
      subjectId,
      'reject',
      adminId,
      user,
    );
    return { score: score };
  }
}
