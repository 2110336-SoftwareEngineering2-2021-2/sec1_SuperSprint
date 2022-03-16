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
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'canceled', 'negotiating', 'offering', 'confirmed'],
    },
    price: {
      type: Number,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
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
  chatId: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  subjectId: string;
  @ApiProperty()
  level: string;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
}
