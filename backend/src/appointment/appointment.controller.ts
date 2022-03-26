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
  Delete,
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

  @Post('')
  async createAppointment(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
    @Body('subjectId') subjectId: string,
    @Body('price') price: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return await this.appointmentService.createAppointment(
      tutorId,
      studentId,
      subjectId,
      price,
      startTime,
      endTime,
    );
  }

  // offering
  // @UseGuards(AuthGuard('jwt'))
  @Get('/:userType/:id/:status')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointmentsByType(
    @Param('userType') userType: string,
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    return await this.appointmentService.getAppointmentsByStatus(
      userType,
      id,
      status,
    );
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/chat')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointmentsByChat(
    @Query('tutorId') tutorId: string,
    @Query('studentId') studentId: string,
  ) {
    return await this.appointmentService.getAppointmentsByChat(
      tutorId,
      studentId,
    );
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete('/:appointmentId')
  @ApiOkResponse({ type: [Appointment] })
  async cancelAppointment(@Param('appointmentId') appointmentId: string) {
    return await this.appointmentService.cancelAppointment(appointmentId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch('student/accept/:appointmentId')
  async studentAcceptAppointment(
    @Param('appointmentId') appointmentId: string,
  ) {
    return await this.appointmentService.studentAcceptAppointment(
      appointmentId,
    );
  }
}
