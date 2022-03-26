import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '@src/models/appointment.model';
import { Tutor } from '@src/models/tutor.model';
import { TutorService } from '../tutor/tutor.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel('Tutor')
    private readonly tutorModel: Model<Tutor>,
    private readonly tutorService: TutorService,
  ) {}

  async getAppointmentsByStatus(userType: string, id: string, status: string) {
    let appointments;
    if (userType === 'student') {
      appointments = await this.appointmentModel
        .find({
          studentId: id,
          status: status,
        })
        .populate('subjectId');
    } else if (userType === 'tutor') {
      appointments = await this.appointmentModel
        .find({
          tutorId: id,
          status: status,
        })
        .populate('subjectId');
    } else {
      throw new NotFoundException('user type not found');
    }

    return {
      message: 'get appointments by status successfully',
      appointments: appointments,
    };
  }

  async getAppointmentsByChat(tutorId: string, studentId: string) {
    const appointments = await this.appointmentModel
      .find({
        tutorId: tutorId,
        studentId: studentId,
      })
      .populate('subjectId');
    return {
      message: 'get appointments by chat successfully',
      appointments: appointments,
    };
  }

  async createAppointment(
    tutorId: string,
    studentId: string,
    subjectId: string,
    price: number,
    startTime: string,
    endTime: string,
  ) {
    // check tutor's availability
    console.log(tutorId);
    const tutor = await this.tutorModel.findOne({
      _id: tutorId,
    });

    const availability = tutor.dutyTime.find(
      (dutyTime) =>
        dutyTime.start <= new Date(startTime) &&
        new Date(endTime) <= dutyTime.end,
    );

    if (!availability) {
      throw new ForbiddenException('tutor is not available');
    }

    const appointment = new this.appointmentModel({
      tutorId,
      studentId,
      subjectId,
      price,
      startTime,
      endTime,
    });
    await appointment.save();
    return {
      message: 'created appointment successfully',
      appointment: appointment,
    };
  }

  async cancelAppointment(id: string) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      {
        status: 'canceled',
      },
      {
        new: true,
      },
    );
    return {
      message: 'canceled appointment successfully',
      appointment: appointment,
    };
  }

  async studentAcceptAppointment(id: string) {
    // remove tutor's avalability

    const appointment = await this.appointmentModel.findById(id);

    const appointmentStartTime = new Date(appointment.startTime);
    const appointmentEndTime = new Date(appointment.endTime);

    if (appointment.status === 'confirmed') {
      throw new ForbiddenException('appointment is already confirmed');
    } else if (appointment.status === 'canceled') {
      throw new ForbiddenException('appointment is already canceled');
    }

    const tutor = await this.tutorModel.findOne({
      _id: appointment.tutorId,
    });

    const availabilityTimeIndex = tutor.dutyTime.findIndex(
      (dutyTime) =>
        new Date(dutyTime.start) <= appointmentStartTime &&
        appointmentEndTime <= new Date(dutyTime.end),
    );

    if (availabilityTimeIndex === -1) {
      this.cancelAppointment(id);
      throw new ForbiddenException('tutor is not available');
    }
    const availabilityTime = tutor.dutyTime[availabilityTimeIndex];
    tutor.dutyTime.splice(availabilityTimeIndex, 1);

    if (
      new Date(availabilityTime.start) == appointmentStartTime &&
      new Date(availabilityTime.end) == appointmentEndTime
    ) {
      // do nothing
    } else if (new Date(availabilityTime.start) == appointmentStartTime) {
      // tutorId:string,addDate:string,addStartTime:string,addEndTime:string
      this.tutorService.addDutyTimeDateTime(
        tutor.id,
        appointmentEndTime.toString(),
        new Date(availabilityTime.end).toString(),
      );
    } else if (new Date(availabilityTime.end) == appointmentEndTime) {
      this.tutorService.addDutyTimeDateTime(
        tutor.id,
        new Date(availabilityTime.start).toString(),
        appointmentStartTime.toString(),
      );
    } else {
      this.tutorService.addDutyTimeDateTime(
        tutor.id,
        new Date(availabilityTime.start).toString(),
        appointmentStartTime.toString(),
      );
      this.tutorService.addDutyTimeDateTime(
        tutor.id,
        appointmentEndTime.toString(),
        new Date(availabilityTime.end).toString(),
      );
    }

    await tutor.save();

    appointment.status = 'confirmed';
    await appointment.save();

    return {
      message: `confirmed ${id} appointment successfully`,
      appointment: appointment,
    };
  }
}
