import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  addTutor(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('userType') userType: string,
    @Body('gender') gender: string,
    @Body('avgRating') avgRating: number,
    @Body('successMatch') successMatch: number,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: Array<Array<string>>,
  ): Promise<string> {
    return this.tutorService.insertTutor(
      firstName,
      lastName,
      email,
      phone,
      username,
      userType,
      gender,
      avgRating,
      successMatch,
      teachSubject,
      priceMin,
      priceMax,
      dutyTime,
    );
  }

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
    @Body('userType') userType: string,
    @Body('gender') gender: string,
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
      userType,
      gender,
      avgRating,
      successMatch,
      teachSubject,
      priceMin,
      priceMax,
      dutyTime,
    );
  }
}
