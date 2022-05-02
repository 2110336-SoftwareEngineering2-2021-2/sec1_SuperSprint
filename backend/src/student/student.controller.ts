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
import {
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { Student } from '../models/student.model';
import { Tutor } from '../models/tutor.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('student')
@Controller('student')
@ApiBearerAuth()
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('recommend')
  @ApiOperation({
    summary: "Recommend tutors based on student's prefered subjects",
  })
  @ApiOkResponse({ type: [Tutor] })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        studentId: { type: 'string', example: '621c8c3d363377298c2bf8b2' },
      },
    },
  })
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferSubject(studentId);
    const result = await this.tutorService.recommendTutor(subjects);
    return { tutorList: result };
  }

  // @ApiOperation({
  //   summary: 'Return all students',
  // })
  // @Get('getAllStudents')
  // @ApiOkResponse({ type: [Student] })
  // getAllStudents() {
  //   return this.studentService.getStudents();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  @ApiOkResponse({ type: Student })
  @ApiQuery({ name: 'id', example: '621c8c3d363377298c2bf8b2' })
  @ApiOperation({
    summary: 'Return a student whose id is matched',
  })
  getStudentById(@Query('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: "Update student's account information",
  })
  @ApiOkResponse({ type: Student })
  @ApiParam({ name: 'id', example: '621c8c3d363377298c2bf8b2' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Phu' },
        lastName: { type: 'string', example: 'Jong' },
        email: { type: 'string', example: 'phu@jong.com' },
        image: {
          type: 'string',
          format: 'binary',
        },
        phone: { type: 'string', example: '0123456789' },
        username: { type: 'string', example: 'phu.jong' },
        gender: {
          type: 'string',
          example: 'm',
        },
        preferSubject: {
          type: 'array',
          items: {
            type: 'string',
            example: '6204f74398648fc94382135f',
          },
        },
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
    if (!Array.isArray(preferSubject)) {
      preferSubject = [preferSubject];
    }

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
