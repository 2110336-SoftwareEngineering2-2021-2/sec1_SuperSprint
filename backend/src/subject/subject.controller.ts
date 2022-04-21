import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import {
  ApiBody,
  ApiQuery,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { Subject } from '../models/subject.model';

@ApiTags('subject')
@ApiOkResponse({ type: Subject })
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('getById')
  @ApiOperation({
    summary: 'Return a subject whose id is matched',
  })
  @ApiBody({
    schema: {
      properties: {
        subjectId: { type: 'string', example: '6204f74398648fc94382135f' },
      },
    },
  })
  @ApiOkResponse({ type: Subject })
  async getSubject(@Body('subjectId') subjectId: string) {
    const subject = await this.subjectService.getName(subjectId);
    return { subject };
  }

  @ApiOperation({
    summary: 'Return all subjects',
  })
  @Get('getAllSubjects')
  @ApiOkResponse({ type: [Subject] })
  async getAllSubjects() {
    const subjects = await this.subjectService.getSubjects();
    return { subjects };
  }

  @Get('getAllSubjectsName')
  @ApiOperation({
    summary: 'Return a list of title of subjects ',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        subjects: {
          type: 'array',
          items: {
            type: 'string',
            example: 'PAT1',
          },
        },
      },
    },
  })
  async getAllSubjectsName() {
    const subjects = await this.subjectService.getSubjectsName();
    return { subjects };
  }

  @Get('getByLevel')
  @ApiOperation({
    summary: 'Return a list of subjects whose level is matched',
  })
  @ApiQuery({ name: 'level', example: 'highschool' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        subjects: {
          type: 'array',
          items: {
            type: 'string',
            example: 'PAT1',
          },
        },
      },
    },
  })
  async getSubjectsByLevel(@Query('level') level: string) {
    const subjects = await this.subjectService.getSubjectsByLevel(level);
    return { subjects };
  }

  @Get('getAllLevels')
  @ApiOperation({
    summary: 'Return a list of levels',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        levels: {
          type: 'array',
          items: {
            type: 'string',
            example: 'highschool',
          },
        },
      },
    },
  })
  async getAllLevels() {
    const levels = await this.subjectService.getLevels();
    return { levels };
  }

  @Get('getAllSubjectsLevel')
  @ApiOperation({
    summary: 'Return all subjects with available levels',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        subject: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              level: { type: 'string', example: '9subjects' },
              id: { type: 'string', example: '6204f74398648fc94382135f' },
            },
          },
        },
      },
    },
  })
  async getAllSubjectsLevel() {
    const result = await this.subjectService.getAllSubjectsLevel();
    return result;
  }

  @Post('create')
  @ApiOperation({
    summary: 'Create new subject',
  })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: 'PAT1' },
        level: { type: 'string', example: 'highschool' },
        description: {
          type: 'string',
          example: 'the mathematics entrances exam',
        },
        maxScore: { type: 'number', example: '300' },
      },
    },
  })
  async addSubject(
    @Body('title') title: string,
    @Body('level') level: string,
    @Body('description') description: string,
    @Body('maxScore') maxScore: number,
  ) {
    const newSubject = await this.subjectService.insertSubject(
      title,
      level,
      description,
      maxScore,
    );
    return { id: newSubject };
  }
}
