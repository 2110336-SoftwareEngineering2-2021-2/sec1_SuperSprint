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
import { ApiBody, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Appointment } from '@src/models/appointment.model';
import { Tutor } from '@src/models/tutor.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: [Appointment] })
  async getAllAppointments(
    @Query('tutorId') tutorId: string,
    @Query('studentId') studentId: string,
  ) {
    return await this.appointmentService.getAppointments(tutorId, studentId);
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

  // @UseGuards(AuthGuard('jwt'))
  @Patch('tutorUpdate')
  async tutorUpdate(
    @Body('appointmentId') appointmentId: string,
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
    @Body('status') status: string, // incoming status
    @Body('price') price: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return await this.appointmentService.tutorUpdateAppointment(
      appointmentId,
      tutorId,
      studentId,
      status,
      price,
      startTime,
      endTime,
    );
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch('studentUpdate')
  async studentUpdate(
    @Body('appointmentId') appointmentId: string,
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
    @Body('status') status: string, // incoming status
    @Body('price') price: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return await this.appointmentService.studentUpdateAppointment(
      appointmentId,
      tutorId,
      studentId,
      status,
      price,
      startTime,
      endTime,
    );
  }

  @Post('create')
  async createAppointment(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
    @Body('subjectId') subjectId: string,
  ) {
    return await this.appointmentService.createAppointment(
      tutorId,
      studentId,
      subjectId,
    );
  }
}
