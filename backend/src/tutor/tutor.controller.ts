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
import { ApiTags, ApiOkResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';
import { Tutor } from '../models/tutor.model';

@ApiTags('tutor')
@Controller('tutor')
export class TutorController {
  constructor(
    private readonly tutorService: TutorService,
    private readonly scoreService: ScoreService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('search')
  @ApiBody({
    schema: {
      example: {
        text: 'text to search',
      },
    },
  })
  @ApiOkResponse({ type: [Tutor] })
  searchTutor(@Body('text') text: string): any {
    return this.tutorService.searchTutor(text);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('match')
  @ApiBody({
    schema: {
      example: {
        subjectName: 'mathematics',
        level: 'highschool',
        priceMin: 100,
        priceMax: 1000,
        availabilityStudent: 1,
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
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: Tutor })
  @ApiBody({
    schema: {
      example: {
        id: '00001',
        firstName: 'Poom',
        lastName: 'Suchao',
        email: 'poom@suchao.com',
        phone: '0987654321',
        username: 'poom.suchao',
        gender: 'm',
        image: '',
        avgRating: 4.8,
        successMatch: 10,
        teachSubject: [],
        priceMin: 100,
        priceMax: 1000,
        dutyTime: [
          {
            start: '2022-02-16T08:00:00.000+00:00',
            end: '2022-02-16T09:30:00.000+00:00',
          },
        ],
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

  @UseGuards(AuthGuard('jwt'))
  @Get('getAllTutors')
  @ApiOkResponse({ type: [Tutor] })
  getAllTutors() {
    return this.tutorService.getTutors();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  @ApiOkResponse({ type: Tutor })
  getTutorById(@Query('id') id: string) {
    return this.tutorService.getTutorById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  getTutor(@Body('id') id: string) {
    console.log(id);
    return this.tutorService.getTutorById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('score')
  async getTutorScore(@Query('id') id: string) {
    // console.log(id);
    return await this.scoreService.getTutorSubjectsScore(id);
  }
}
