import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { UserSchema } from '../models/user.model';

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
  },
  userType: {
    type: String,
    required: true,
  },
  gender: { type: String },
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

export interface Tutor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  userType: string;
  gender: string;
  avgRating: number;
  successMatch: number;
  teachSubject: Array<string>;
  priceMax: number;
  priceMin: number;
  dutyTime: Array<{ start: Date; end: Date }>;
}
