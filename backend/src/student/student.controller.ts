import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { TutorService } from '../tutor/tutor.service';
import { ApiBody, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Student } from '../models/student.model';
import { Tutor } from '../models/tutor.model';
@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}

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

  @Post('chooseTutor')
  @ApiBody({
    schema: {
      example: {
        studentId: '00001',
        tutorId: '00001',
      },
    },
  })
  chooseTutor(
    @Body('studentId') studentId: string,
    @Body('tutorId') tutorId: string,
  ) {
    const status = this.studentService.chooseTutor(studentId, tutorId);
    return { appoinmentStatus: status };
  }

  @Get('getAllStudents')
  @ApiOkResponse({ type: [Student] })
  getAllStudents() {
    return this.studentService.getStudents();
  }

  @Get('getById')
  @ApiOkResponse({ type: Student })
  getStudentById(@Body('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Patch(':id')
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
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('gender') gender: string,
    @UploadedFile() image: Express.Multer.File,
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
