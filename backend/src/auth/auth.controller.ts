import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport'; //! install passport too

@ApiTags()
@Controller('register')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('student')
  @UseInterceptors(FileInterceptor('image'))
  addStudent(
    @UploadedFile() image: Express.Multer.File,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
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
      image,
      preferSubject,
    );
  }

  @Post('tutor')
  @UseInterceptors(FileInterceptor('image'))
  addTutor(
    @UploadedFile() image: Express.Multer.File,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    // @Body('profileUrl') profileUrl: string,
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
      image,
      avgRating,
      successMatch,
      teachSubject,
      priceMin,
      priceMax,
      dutyTime,
    );
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('test');
    console.log(req.body);
    return this.authService.login(req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  async test(@Request() req) {
    console.log(req);
    return 'dfasdf';
  }
}
