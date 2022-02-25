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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PassportStrategy } from '@nestjs/passport';
import { TutorService } from './tutor.service';
import { ApiTags, ApiOkResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';
import { Tutor } from '../models/tutor.model';

@ApiTags('tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('search')
  @ApiParam({ name: 'text', type: String })
  @ApiOkResponse({ type: [Tutor] })
  searchTutor(@Body('text') text: string): any {
    return this.tutorService.searchTutor(text);
  }

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

  @Patch(':id')
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
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('gender') gender: string,
    @UploadedFile() image: Express.Multer.File,
    @Body('avgRating') avgRating: number,
    @Body('successMatch') successMatch: number,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: Array<Array<string>>,
  ) {
    const newDutyTime = JSON.stringify(dutyTime);
    console.log(newDutyTime);
    console.log(teachSubject[0]);

    return this.tutorService.updateTutor(
      id,
      firstName,
      lastName,
      email,
      phone,
      username,
      gender,
      image,
      avgRating,
      successMatch,
      teachSubject,
      priceMin,
      priceMax,
      dutyTime,
    );
  }

  @Get('getAllTutors')
  @ApiOkResponse({ type: [Tutor] })
  getAllTutors() {
    return this.tutorService.getTutors();
  }

  @Get('getById')
  @ApiOkResponse({ type: Tutor })
  getTutorById(@Body('id') id: string) {
    return this.tutorService.getTutorById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  getTutor(@Body('id') id: string) {
    console.log(id);
    return this.tutorService.getTutorById(id);
  }
}
