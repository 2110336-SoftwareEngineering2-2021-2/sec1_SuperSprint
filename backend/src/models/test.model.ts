import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TestSchema = new mongoose.Schema(
  {
    tutorId: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
export interface Test {
  tutorId: string;
  subjectId: string;
  score: number;
  maxScore: number;
  year: number;
}
