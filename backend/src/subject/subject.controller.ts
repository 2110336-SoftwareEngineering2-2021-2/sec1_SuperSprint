import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('getById')
  async getSubject(@Body('subjectId') subjectId: string) {
    const subject = await this.subjectService.getName(subjectId);
    return { subject };
  }

  @Get('getAllSubjects')
  async getAllSubjects() {
    const subjects = await this.subjectService.getSubjects();
    return { subjects };
  }

  @Get('getAllSubjectsName')
  async getAllSubjectsName() {
    const subjects = await this.subjectService.getSubjectsName();
    return { subjects };
  }

  @Get('getByLevel')
  async getSubjectsByLevel(@Query('level') level: string) {
    const subjects = await this.subjectService.getSubjectsByLevel(level);
    return { subjects };
  }

  @Get('getAllLevels')
  async getAllLevels() {
    const levels = await this.subjectService.getLevels();
    return { levels };
  }

  @Post('create')
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
