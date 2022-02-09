import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { StudentService } from './student.service';
import { TutorService } from '../tutor/tutor.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}
  // constructor(private readonly tutorService: TutorService) {}
  @Get()
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferredSubject(studentId);
    const result = await this.tutorService.recommendTutor(subjects);
    return { tutorList: result };
  }

  @Post()
  chooseTutor(
    @Body('studentId') studentId: string,
    @Body('tutorId') tutorId: string,
  ) {
    const status = this.studentService.chooseTutor(studentId, tutorId);
    return { appoinmentStatus: status };
  }
}
