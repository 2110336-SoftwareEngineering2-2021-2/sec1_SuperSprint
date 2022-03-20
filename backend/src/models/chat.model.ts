import * as mongoose from 'mongoose';

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
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export interface Chat {
  _id: string;
  tutorId: string;
  studentId: string;
  messages: Array<string>;
}
