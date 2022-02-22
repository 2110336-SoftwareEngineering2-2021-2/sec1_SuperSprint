import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('register')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('student')
  addStudent(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    @Body('profileUrl') profileUrl: string,
    @Body('preferSubject') preferSubject: Array<string>,
  ): Promise<string> {
    return this.authService.insertStudent(
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      gender,
      profileUrl,
      preferSubject,
    );
  }

  @Post('tutor')
  addTutor(
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
  ): Promise<string> {
    return this.authService.insertTutor(
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
}
