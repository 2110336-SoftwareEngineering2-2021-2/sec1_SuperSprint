import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
export class Subject {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  level: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  maxScore: number;
}
