import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  // constructor(private readonly tutorService: TutorService) {}
  @Get()
  async getSubject(@Body('subjectId') subjectId: string) {
    const name = await this.subjectService.getName(subjectId);
    return { id: name };
  }

  @Post()
  async addSubject(
    @Body('title') title: string,
    @Body('level') level: string,
    @Body('description') description: string,
  ) {
    const newSubject = await this.subjectService.insertSubject(
      title,
      level,
      description,
    );
    return { id: newSubject };
  }
}
