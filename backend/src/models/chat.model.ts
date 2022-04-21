import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const ChatSchema = new mongoose.Schema(
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
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    accepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export class Chat {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  tutorId: string;
  @ApiProperty()
  studentId: string;
  @ApiProperty()
  messages: Array<string>;
  @ApiProperty()
  accepted: boolean;
}
