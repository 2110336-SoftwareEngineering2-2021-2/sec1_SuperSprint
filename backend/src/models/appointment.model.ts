import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const AppointmentSchema = new mongoose.Schema(
  {
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    // chatId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Chat',
    // },
    status: {
      type: String,
      required: true,
      default: 'offering',
      enum: ['canceled', 'offering', 'confirmed'],
    },
    price: {
      type: Number,
      required: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export class Appointment {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  tutorId: string;
  @ApiProperty()
  studentId: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  subjectId: string;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
}
