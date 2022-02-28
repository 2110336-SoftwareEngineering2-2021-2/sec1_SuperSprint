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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/student')
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

  @Post('register/tutor')
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
    @Body('avgRating') avgRating: number,
    @Body('successMatch') successMatch: number,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: string,
  ): Promise<string> {
    const newDutyTime = JSON.parse(dutyTime);
    console.log(newDutyTime);
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
      newDutyTime,
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
    console.log(req.user.username, req.user.sub);
    return 'Login sucessfully';
  }
  @UseInterceptors(FileInterceptor('image'))
  @Post('test2')
  async test2(@UploadedFile() image: Express.Multer.File, @Request() req) {
    console.log(req);
    // console.log(req.user.username, req.user.sub);
    return 'Login sucessfully';
  }
}
