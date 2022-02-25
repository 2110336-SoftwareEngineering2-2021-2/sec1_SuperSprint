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
import { ApiTags } from '@nestjs/swagger';
@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}

  @Post('recommend')
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferSubject(studentId);
    const result = await this.tutorService.recommendTutor(subjects);
    return { tutorList: result };
  }

  @Post('chooseTutor')
  chooseTutor(
    @Body('studentId') studentId: string,
    @Body('tutorId') tutorId: string,
  ) {
    const status = this.studentService.chooseTutor(studentId, tutorId);
    return { appoinmentStatus: status };
  }

  @Get('getAllStudents')
  getAllStudents() {
    return this.studentService.getStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Patch(':id')
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
