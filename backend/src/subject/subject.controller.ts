import { Controller, Body, Get, Post, Injectable } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('getById')
  async getSubject(@Body('subjectId') subjectId: string) {
    const name = await this.subjectService.getName(subjectId);
    return { id: name };
  }

  @Get('getSubjects')
  async getAllSubjects() {
    const subjects = await this.subjectService.getSubjects();
    return { subjects };
  }

  @Get('getLevels')
  async getAllLevels() {
    const levels = await this.subjectService.getLevels();
    return { levels };
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
