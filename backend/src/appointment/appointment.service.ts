import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '@src/models/appointment.model';
import { S3Service } from '@src/services/S3Sevices.service';

@Injectable()
export class AppointmentService {
  private appointments: Appointment[] = [];

  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
    private readonly s3Service: S3Service,
  ) {}

  async getAppointments(tutorId: string, studentId: string) {
    let appointments;
    if (tutorId) {
      appointments = await this.appointmentModel.find({
        tutorId: tutorId,
        isDeleted: false,
      });
    } else if (studentId) {
      appointments = await this.appointmentModel.find({
        studentId: studentId,
        isDeleted: false,
      });
    }
    return {
      message: 'get appointments successfully!!',
      appointments: appointments,
    };
  }

  async createAppointment(
    tutorId: string,
    studentId: string,
    subject: string,
    level: string,
  ) {
    const appointment = new this.appointmentModel({
      tutorId,
      studentId,
      subject,
      level,
    });
    return {
      message: 'created appointment successfully!!',
      appointment: appointment.save(),
    };
  }

  async updateAppointment(
    id: string,
    tutorId: string,
    studentId: string,
    status: string,
    price: number,
    startTime: string,
    endTime: string,
  ) {
    if (tutorId) {
      const appointment = await this.appointmentModel.findById(id);
      switch (appointment.status) {
        case 'pending':
          if (status === 'accept') {
            appointment.status = 'negotiating';
          } else if (status === 'decline') {
            appointment.status = 'canceled';
          } else if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
          break;
        case 'negotiating':
          if (status === 'offer') {
            appointment.status = 'offering';
            const startDateTime = new Date(startTime);
            const endDateTime = new Date(endTime);
            appointment.startTime = startDateTime;
            appointment.endTime = endDateTime;
            appointment.price = price;
          } else if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
          break;
        case 'offering':
          if (status === 'decline') {
            appointment.status = 'negotiating';
            appointment.startTime = null;
            appointment.endTime = null;
            appointment.price = null;
          } else if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
        default:
          throw new ForbiddenException('No status to change');
          break;
      }
      // update appointment
      return {
        message: 'updated appointment successfully!!',
        appointment: appointment.save(),
      };
    } else if (studentId) {
      const appointment = await this.appointmentModel.findById(id);
      // update appointment
      switch (appointment.status) {
        case 'pending':
          if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
          break;
        case 'negotiating':
          if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
          break;
        case 'offering':
          if (status === 'accept') {
            appointment.status = 'confirmed';
          } else if (status === 'decline') {
            appointment.status = 'negotiating';
            appointment.startTime = null;
            appointment.endTime = null;
            appointment.price = null;
          } else if (status === 'cancel') {
            appointment.status = 'canceled';
          } else {
            throw new ForbiddenException('You can not change status');
          }
          break;
        default:
          throw new ForbiddenException('No status to change');
      }

      return {
        message: 'updated appointment successfully!!',
        appointment: appointment.save(),
      };
    }
    return {
      message: 'not found appointment!!',
    };
  }
}
