import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PassportStrategy } from '@nestjs/passport';

import { ScoreService } from '../score/score.service';
import { TutorService } from './tutor.service';
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
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';
import { Tutor } from '@src/models/tutor.model';
import { Score } from '@src/models/score.model';
import { object } from 'webidl-conversions';

@ApiTags('tutor')
@ApiBearerAuth()
@Controller('tutor')
export class TutorController {
  constructor(
    private readonly tutorService: TutorService,
    private readonly scoreService: ScoreService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('search')
  @ApiOperation({
    summary: 'Search tutor by name or subject',
  })
  @ApiBody({
    schema: {
      properties: {
        text: { type: 'string', example: 'text to search' },
      },
    },
  })
  @ApiOkResponse({ type: [Tutor] })
  searchTutor(@Body('text') text: string): any {
    return this.tutorService.searchTutor(text);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: "Match tutors based on student's matching options",
  })
  @Post('match')
  @ApiBody({
    schema: {
      properties: {
        subjectName: { type: 'string', example: 'mathematics' },
        level: { type: 'string', example: 'highschool' },
        priceMin: { type: 'number', example: '100' },
        priceMax: { type: 'number', example: '200' },
        availabilityStudent: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              availabilityDate: { type: 'string', example: '2020-01-31' },
              availabilityTimeFrom: { type: 'string', example: '10:00' },
              availabilityTimeTo: { type: 'string', example: '12:00' },
            },
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: [Tutor] })
  async matchTutor(
    @Body('subjectName') subjectName: string,
    @Body('level') level: string,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('availabilityStudent')
    availabilityStudent: {
      availabilityDate: string;
      availabilityTimeFrom: string;
      availabilityTimeTo: string;
    }[],
  ) {
    return await this.tutorService.matchTutor(
      subjectName,
      level,
      priceMin,
      priceMax,
      availabilityStudent,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: "Update tutor's account information",
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: Tutor })
  @ApiParam({ name: 'id', example: '621c818daefa29db6f3e806f' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Poom' },
        lastName: { type: 'string', example: 'Jong' },
        email: { type: 'string', example: 'phu@jong.com' },
        image: {
          type: 'string',
          format: 'binary',
        },
        phone: { type: 'string', example: '0123456789' },
        username: { type: 'string', example: 'phu.jong' },
        gender: {
          type: 'string',
          example: 'm',
        },
        avgRating: { type: 'number', example: '5.0' },
        successMatch: { type: 'number', example: '10' },
        teachSubject: {
          type: 'array',
          items: { type: 'string', example: '6204f74398648fc94382135f' },
        },
        priceMin: { type: 'number', example: '10' },
        priceMax: { type: 'number', example: '100' },
        dutyTime: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              start: {
                type: 'string',
                example: '2022-02-16T08:00:00.000+00:00',
              },
              end: { type: 'string', example: '2022-02-16T09:30:00.000+00:00' },
            },
          },
        },
      },
    },
  })
  updateTutor(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('gender') gender: string,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: string,
  ) {
    let newDutyTime = null;

    if (dutyTime) {
      newDutyTime = JSON.parse(dutyTime);
    }

    return this.tutorService.updateTutor(
      id,
      firstName,
      lastName,
      email,
      phone,
      username,
      gender,
      image,
      teachSubject,
      priceMin,
      priceMax,
      newDutyTime,
    );
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('getAllTutors')
  // @ApiOkResponse({ type: [Tutor] })
  // getAllTutors() {
  //   return this.tutorService.getTutors();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  @ApiOkResponse({ type: Tutor })
  @ApiQuery({ name: 'id', example: '621c818daefa29db6f3e806f' })
  @ApiOperation({
    summary: 'Return a tutor whose id is matched',
  })
  getTutorById(@Query('id') id: string) {
    return this.tutorService.getTutorById(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('test')
  // getTutor(@Body('id') id: string) {
  //   console.log(id);
  //   return this.tutorService.getTutorById(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('score')
  @ApiOperation({
    summary: 'Return all scores of tutor whose id is matched',
  })
  @ApiOkResponse({ type: [Score] })
  @ApiQuery({ name: 'id', example: '621c818daefa29db6f3e806f' })
  async getTutorScore(@Query('id') id: string) {
    // console.log(id);
    return await this.scoreService.getTutorSubjectsScore(id);
  }
}
