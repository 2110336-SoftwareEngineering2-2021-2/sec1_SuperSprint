import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  UploadedFile,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { TutorService } from '../tutor/tutor.service';
import { ApiBody, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Student } from '../models/student.model';
import { Tutor } from '../models/tutor.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('recommend')
  @ApiOkResponse({ type: [Tutor] })
  @ApiBody({
    schema: {
      example: {
        studentId: '00001',
      },
    },
  })
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferSubject(studentId);
    const result = await this.tutorService.recommendTutor(subjects);
    return { tutorList: result };
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('chooseTutor')
  @ApiBody({
    schema: {
      example: {
        studentId: '00001',
        tutorId: '00001',
      },
    },
  })
  @ApiOkResponse({ schema: { example: 'pending' } })
  chooseTutor(
    @Body('studentId') studentId: string,
    @Body('tutorId') tutorId: string,
  ) {
    const status = this.studentService.chooseTutor(studentId, tutorId);
    return { appoinmentStatus: status };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('getAllStudents')
  @ApiOkResponse({ type: [Student] })
  getAllStudents() {
    return this.studentService.getStudents();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  @ApiOkResponse({ type: Student })
  getStudentById(@Query('id') id: string) {
    return this.studentService.getStudentById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: Student })
  @ApiBody({
    schema: {
      example: {
        id: '00001',
        firstName: 'Phu',
        lastName: 'Jong',
        email: 'phu@jong.com',
        phone: '0123456789',
        username: 'phu.jong',
        gender: 'm',
        image: '',
        preferSubject: [],
      },
    },
  })
  updateStudent(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('gender') gender: string,
    @Body('preferSubject') preferSubject: Array<string>,
  ) {
    return this.studentService.updateStudent(
      id,
      firstName,
      lastName,
      email,
      phone,
      username,
      gender,
      image,
      preferSubject,
    );
  }
}
