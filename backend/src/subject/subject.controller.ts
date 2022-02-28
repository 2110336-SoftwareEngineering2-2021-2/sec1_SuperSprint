import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { Subject } from '../models/subject.model';

@ApiTags('subject')
@ApiOkResponse({ type: Subject })
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('getById')
  @ApiBody({
    schema: {
      example: {
        subjectId: '012345678945641',
      },
    },
  })
  async getSubject(@Body('subjectId') subjectId: string) {
    const subject = await this.subjectService.getName(subjectId);
    return { subject };
  }

  @Get('getAllSubjects')
  @ApiOkResponse({ type: [Subject] })
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

  @Get('getAllSubjectsLevel')
  @ApiOkResponse({
    schema: {
      example: {
        mathematics: [
          { highschool: '0123456789' },
          { '9subjects': '0123456789' },
        ],
        pat1: [{ pat: '0123456789' }],
      },
    },
  })
  async getAllSubjectsLevel() {
    const result = await this.subjectService.getAllSubjectsLevel();
    return result;
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
