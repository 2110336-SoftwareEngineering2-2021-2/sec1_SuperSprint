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
  @ApiParam({ name: 'subjectName', type: String })
  @ApiParam({ name: 'level', type: String })
  @ApiParam({ name: 'priceMin', type: Number })
  @ApiParam({ name: 'priceMax', type: Number })
  @ApiParam({ name: 'availabilityStudent', type: Number })
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
  updateTutor(
    @Param('id') id: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('gender') gender: string,
    @UploadedFile() image: Express.Multer.File,
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
  getAllTutors() {
    return this.tutorService.getTutors();
  }
  @Get('getById')
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
