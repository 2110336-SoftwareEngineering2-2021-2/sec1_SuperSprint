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
  Req,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
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

  @ApiOkResponse({ type: Tutor })
  @ApiBody({
    schema: {
      example: {
        id: '00001',
        firstName: 'Poom',
        lastName: 'Suchao',
        email: 'poom@suchao.com',
        phone: '0987654321',
        username: 'poom.suchao',
        gender: 'm',
        image: '',
        avgRating: 4.8,
        successMatch: 10,
        teachSubject: [],
        priceMin: 100,
        priceMax: 1000,
        dutyTime: [
          {
            start: '2022-02-16T08:00:00.000+00:00',
            end: '2022-02-16T09:30:00.000+00:00',
          },
        ],
      },
    },
  })
  @Post('')
  async createAppointment(
    @Body('chatId') chatId: string,
    // @Body('studentId') studentId: string,
    @Body('subjectId') subjectId: string,
    @Body('price') price: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    // @Req() req: Request,
  ) {
    // console.log(req);
    return await this.appointmentService.createAppointment(
      chatId,
      // studentId,
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
  @Get('/chat/:chatId')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointmentsByChat(@Param('chatId') chatId: string) {
    return await this.appointmentService.getAppointmentsByChat(chatId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/:userType/:id')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointments(
    @Param('userType') userType: string,
    @Param('id') id: string,
  ) {
    return await this.appointmentService.getAppointments(userType, id);
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
