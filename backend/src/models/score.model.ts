import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ScoreSchema = new mongoose.Schema(
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
    currentScore: {
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
export interface Score {
  _id: string;
  tutorId: string;
  subjectId: string;
  currentScore: number;
  maxScore: number;
  year: number;
}
