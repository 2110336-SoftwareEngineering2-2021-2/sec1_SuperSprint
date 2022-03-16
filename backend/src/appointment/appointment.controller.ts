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
import { AppointmentService } from './appointment.service';
import { TutorService } from '@src/tutor/tutor.service';
import { ApiBody, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Appointment } from '@src/models/appointment.model';
import { Tutor } from '@src/models/tutor.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly tutorService: TutorService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('appointments')
  @ApiOkResponse({ type: [Appointment] })
  getAllAppointments(
    @Query('studentId') studentId: string,
    @Query('tutorId') tutorId: string,
  ) {
    return this.appointmentService.getAppointments(studentId, tutorId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('appointmentStatus')
  async getAppointmentStatus(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
    @Body('date') date: string,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return await this.appointmentService.getStatus(
      tutorId,
      studentId,
      date,
      startTime,
      endTime,
    );
  }
}
