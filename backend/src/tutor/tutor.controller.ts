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
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('search')
  searchTutor(@Body('text') text: string): any {
    return this.tutorService.searchTutor(text);
  }

  @Post('match')
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
  updateTutor(
    @Param('id') id: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    @Body('profileUrl') profileUrl: string,
    @Body('avgRating') avgRating: number,
    @Body('successMatch') successMatch: number,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: Array<Array<string>>,
  ) {
    return this.tutorService.updateTutor(
      id,
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      gender,
      profileUrl,
      avgRating,
      successMatch,
      teachSubject,
      priceMin,
      priceMax,
      dutyTime,
    );
  }

  @Get()
  getAllTutors() {
    return this.tutorService.getTutors();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  getTutor(@Body('id') id: string) {
    console.log(id);
    return this.tutorService.getTutor(id);
  }
}
