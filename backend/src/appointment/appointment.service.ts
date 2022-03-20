import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '@src/models/appointment.model';
import { Chat } from '@src/models/chat.model';
import { ChatService } from '@src/chat/chat.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    private readonly chatService: ChatService,
  ) {}

  async getAppointments(tutorId: string, studentId: string) {
    let appointments;
    if (tutorId) {
      appointments = await this.appointmentModel.find({
        tutorId: tutorId,
      });
    } else if (studentId) {
      appointments = await this.appointmentModel.find({
        studentId: studentId,
      });
    }
    return {
      message: 'get appointments successfully',
      appointments: appointments,
    };
  }
  // each pair of student and tutor has only one appoinment  ????
  async getStatus(
    tutorId: string,
    studentId: string,
    date: string,
    start: string,
    end: string,
  ) {
    const startTime = new Date(date + 'T' + start);
    const endTime = new Date(date + 'T' + end);
    const appointment = await this.appointmentModel.findOne({
      tutorId,
      studentId,
      startTime,
      endTime,
    });
    return { status: appointment.status };
  }

  async createAppointment(
    tutorId: string,
    studentId: string,
    subjectId: string,
  ) {
    const appointment = new this.appointmentModel({
      tutorId,
      studentId,
      subjectId,
      status: 'pending',
    });
    await appointment.save();

    return {
      message: 'created appointment successfully!!',
      appointment: appointment,
    };
  }

  async tutorUpdateAppointment(
    id: string,
    tutorId: string,
    studentId: string,
    status: string,
    price: number,
    startTime: string,
    endTime: string,
  ) {
    const appointment = await this.appointmentModel.findById(id);
    switch (appointment.status) {
      case 'pending':
        if (status === 'accept') {
          appointment.status = 'negotiating';
          // create chatroom
          const chatId = await this.chatService.insertChat(tutorId, studentId);
          appointment.chatId = chatId;
          await appointment.save();
          return {
            message: 'updated appointment successfully',
            appointment: appointment._id,
            chatId: chatId,
          };
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
          // check tutor availability
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
    appointment.save();
    return {
      message: 'updated appointment successfully',
      appointment: appointment._id,
    };
  }

  async studentUpdateAppointment(
    id: string,
    tutorId: string,
    studentId: string,
    status: string,
    price: number,
    startTime: string,
    endTime: string,
  ) {
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
          // remove tutor availability
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

  async canceledAppointment(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    appointment.status = 'canceled';
    await appointment.save();
    return {
      message: 'updated appointment successfully',
      appointment: appointment._id,
    };
  }

  async tutorGetAppointments(tutorId: string) {
    const appointments = await this.appointmentModel.find({ tutorId });
    return {
      message: 'get tutors appointments successfully!!',
      data: appointments,
    };
  }

  async studentGetAppointments(studentId: string) {
    const appointments = await this.appointmentModel.find({ studentId });
    return {
      message: 'get students appointments successfully!!',
      data: appointments,
    };
  }
}
