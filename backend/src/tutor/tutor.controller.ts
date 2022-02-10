import { Controller, Get, Post, Body } from '@nestjs/common';
import { TutorService } from './tutor.service';

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
    );
  }

  @Get('/search')
  searchTutor(@Body('text') text: string): any {
    return this.tutorService.searchTutor(text);
  }
}
