import * as mongoose from 'mongoose';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const TutorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: { type: String },
  profileUrl: {
    type: String,
  },
  avgRating: Number,
  successMatch: Number,
  priceMax: Number,
  priceMin: Number,
  teachSubject: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  dutyTime: [{ start: Date, end: Date }], // free time of tutor
});

export class Tutor {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  username: string;
  @ApiHideProperty()
  password: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  profileUrl: string;
  @ApiProperty()
  avgRating: number;
  @ApiProperty()
  successMatch: number;
  @ApiProperty()
  teachSubject: Array<string>;
  @ApiProperty()
  priceMax: number;
  @ApiProperty()
  priceMin: number;
  @ApiProperty()
  dutyTime: Array<{ start: Date; end: Date }>;
}
