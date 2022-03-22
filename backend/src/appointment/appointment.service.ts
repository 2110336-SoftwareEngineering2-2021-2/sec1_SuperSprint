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
      appointments = await this.appointmentModel.find({
        studentId: id,
        status: status,
      });
    } else if (userType === 'tutor') {
      appointments = await this.appointmentModel.find({
        tutorId: id,
        status: status,
      });
    } else {
      throw new NotFoundException('user type not found');
    }
    return {
      message: 'get appointments by status successfully',
      appointments: appointments,
    };
  }

  async getAppointmentsByChat(tutorId: string, studentId: string) {
    const appointments = await this.appointmentModel.find({
      tutorId: tutorId,
      studentId: studentId,
    });
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
    const availability = await this.tutorModel.findOne({
      _id: tutorId,
      $and: [
        {
          'dutyTime.startTime': { $lte: startTime },
        },
        {
          'dutyTime.endTime': { $gte: endTime },
        },
      ],
    });
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
    const tutor = await this.tutorModel.findOne({
      _id: appointment.tutorId,
      $and: [
        {
          'dutyTime.start': { $lte: appointment.startTime },
        },
        {
          'dutyTime.end': { $gte: appointment.endTime },
        },
      ],
    });

    if (!tutor) {
      this.cancelAppointment(id);
      throw new ForbiddenException('tutor is not available');
    }

    const availabilityTime = tutor.dutyTime.find(
      (dutyTime) =>
        dutyTime.start <= appointment.startTime &&
        appointment.endTime <= dutyTime.end,
    );

    tutor.dutyTime = tutor.dutyTime.filter(
      (dutyTime) =>
        dutyTime.start > appointment.startTime &&
        appointment.endTime > dutyTime.end,
    );

    await tutor.save();

    if (
      availabilityTime.start == appointment.startTime &&
      availabilityTime.end == appointment.endTime
    ) {
      // do nothing
    } else if (availabilityTime.start == appointment.startTime) {
      // tutorId:string,addDate:string,addStartTime:string,addEndTime:string
      this.tutorService.addDutyTime(
        tutor.id,
        appointment.endTime.getDate().toString(),
        appointment.endTime.getHours().toString(),
        availabilityTime.end.getHours().toString(),
      );
    } else if (availabilityTime.end == appointment.endTime) {
      this.tutorService.addDutyTime(
        tutor.id,
        availabilityTime.start.getDate().toString(),
        availabilityTime.start.getHours().toString(),
        appointment.startTime.getHours().toString(),
      );
    } else {
      this.tutorService.addDutyTime(
        tutor.id,
        availabilityTime.start.getDate().toString(),
        availabilityTime.start.getHours().toString(),
        appointment.startTime.getHours().toString(),
      );
      this.tutorService.addDutyTime(
        tutor.id,
        appointment.endTime.getDate().toString(),
        appointment.endTime.getHours().toString(),
        availabilityTime.end.getHours().toString(),
      );
    }

    appointment.status = 'confirmed';
    await appointment.save();

    return {
      message: `confirmed ${id} appointment successfully`,
      appointment: appointment,
    };
  }
}
