import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { StudentService } from './student.service';
import { TutorService } from '../tutor/tutor.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}

  @Get('recommend')
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferredSubject(studentId);
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

  @Post('addStudent')
  addStudent(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('userType') userType: string,
    @Body('gender') gender: string,
    @Body('preferredSubject') preferredSubject: Array<string>,
  ): Promise<string> {
    return this.studentService.insertStudent(
      firstName,
      lastName,
      email,
      phone,
      username,
      userType,
      gender,
      preferredSubject,
    );
  }

  @Get()
  getAllStudents() {
    return this.studentService.getStudents();
  }
}
