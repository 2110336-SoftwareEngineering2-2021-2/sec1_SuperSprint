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
import {
  ApiBody,
  ApiQuery,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport'; //! install passport too
import { Tutor } from '@src/models/tutor.model';
import { Student } from '@src/models/student.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/student')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Sign up new student',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Eiei' },
        lastName: { type: 'string', example: 'Eiei' },
        email: { type: 'string', example: 'eiei@gmail.com' },
        phone: { type: 'string', example: '09123456789' },
        username: { type: 'string', example: 'eiei' },
        password: { type: 'string', example: 'Eiei123456' },
        gender: { type: 'string', example: 'm' },
        image: { type: 'string', format: 'binary' },
        preferSubject: {
          type: 'array',
          items: {
            type: 'string',
            example: '6204f74398648fc94382135f',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: Student })
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

  @Post('signup/tutor')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Sign up new tutor',
  })
  @ApiOkResponse({ type: Tutor })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Phu' },
        lastName: { type: 'string', example: 'Jong' },
        email: { type: 'string', example: 'phu@jong.com' },
        phone: { type: 'string', example: '0123456789' },
        username: { type: 'string', example: 'phu.jong' },
        password: { type: 'string', example: 'Phugod123456' },
        gender: { type: 'string', example: 'm' },
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
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  addTutor(
    @UploadedFile() image: Express.Multer.File,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMax') priceMax: number,
    @Body('dutyTime') dutyTime: string,
  ): Promise<string> {
    const newDutyTime = JSON.parse(dutyTime);
    return this.authService.insertTutor(
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      gender,
      image,
      teachSubject,
      priceMin,
      priceMax,
      newDutyTime,
    );
  }

  // @Post('/createAdmin')
  // addAdmin(
  //   @Body('firstName') firstName: string,
  //   @Body('lastName') lastName: string,
  //   @Body('username') username: string,
  //   @Body('password') password: string,
  // ) {
  //   return this.authService.insertAdmin(
  //     firstName,
  //     lastName,
  //     username,
  //     password,
  //   );
  // }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @ApiOperation({
    summary: 'Sign in user to the system with user type',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 't eiei' },
        password: { type: 'string', example: 'Eiei123456' },
      },
    },
  })
  async signin(@Request() req) {
    return this.authService.signin(req.body);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('refreshToken')
  // async test(@Request() req) {
  //   console.log(req.user.username, req.user.sub);
  //   return 'Login sucessfully';
  // }

  // @UseInterceptors(FileInterceptor('image'))
  // @Post('test2')
  // async test2(@UploadedFile() image: Express.Multer.File, @Request() req) {
  //   console.log(req);
  //   // console.log(req.user.username, req.user.sub);
  //   return 'Login sucessfully';
  // }
}
