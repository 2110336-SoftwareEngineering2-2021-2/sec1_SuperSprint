import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
    imageUrl: {
      type: String,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
export class Score {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  tutorId: string;
  @ApiProperty()
  subjectId: string;
  @ApiProperty()
  currentScore: number;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  maxScore: number;
  @ApiProperty()
  year: number;
  @ApiProperty()
  status: string;
}
