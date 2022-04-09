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
import { Appointment } from '@src/models/appointment.model';
import { Tutor } from '@src/models/tutor.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('appointment')
@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Create an appointment with a tutor and a student',
  })
  @ApiOkResponse({ type: Tutor })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        chatId: { type: 'string', example: '6239a861391503e1556c0b1e' },
        subjectId: { type: 'string', example: '6204f74398648fc94382135f' },
        price: { type: 'number', example: '191' },
        startTime: {
          type: 'string',
          example: 'Sat Apr 09 2022 22:50:22 GMT+0800 (Indochina Time)',
        },
        endTime: {
          type: 'string',
          example: 'Sat Apr 09 2022 22:50:22 GMT+0100 (Indochina Time)',
        },
      },
    },
  })
  @Post('')
  async createAppointment(
    @Body('chatId') chatId: string,
    @Body('subjectId') subjectId: string,
    @Body('price') price: number,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return await this.appointmentService.createAppointment(
      chatId,
      subjectId,
      price,
      startTime,
      endTime,
    );
  }

  // offering
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary:
      'Get list of appointments of user with user type filtered by status',
  })
  @Get('/:userType/:id/:status')
  @ApiOkResponse({ type: [Appointment] })
  @ApiParam({ name: 'userType', example: 'tutor' })
  @ApiParam({ name: 'id', example: '621c818daefa29db6f3e806f' })
  @ApiParam({ name: 'status', example: 'confirmed' })
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

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get list of appointments by chat id',
  })
  @ApiParam({ name: 'chatId', example: '6239a861391503e1556c0b1e' })
  @Get('/chat/:chatId')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointmentsByChat(@Param('chatId') chatId: string) {
    return await this.appointmentService.getAppointmentsByChat(chatId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get list of appointments of user with user type',
  })
  @ApiParam({ name: 'userType', example: 'tutor' })
  @ApiParam({ name: 'id', example: '621c818daefa29db6f3e806f' })
  @Get('/:userType/:id')
  @ApiOkResponse({ type: [Appointment] })
  async getAppointments(
    @Param('userType') userType: string,
    @Param('id') id: string,
  ) {
    return await this.appointmentService.getAppointments(userType, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Cancel an appointment that matched with the id',
  })
  @ApiParam({ name: 'appointmentId', example: '621c818daefa29db6f3e806f' })
  @Delete('/:appointmentId')
  @ApiOkResponse({ type: [Appointment] })
  async cancelAppointment(@Param('appointmentId') appointmentId: string) {
    return await this.appointmentService.cancelAppointment(appointmentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Accept an appointment that matched with the id',
  })
  @ApiParam({ name: 'appointmentId', example: '621c818daefa29db6f3e806f' })
  @Patch('student/accept/:appointmentId')
  async studentAcceptAppointment(
    @Param('appointmentId') appointmentId: string,
  ) {
    return await this.appointmentService.studentAcceptAppointment(
      appointmentId,
    );
  }
}
