import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';

const Schema = mongoose.Schema;

export const TutorSchema = new mongoose.Schema({
  ...UserSchema.obj,
  tutorId: String,
  avgRating: Number,
  successMatch: Number,
  teachSubject: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  pricemin: Number,
  pricemax: Number,
  duty_time: [Date]
});

export interface Tutor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  user_type: string;
  gender: string;
  tutorId: string;
  avgRating: number;
  successMatch: number;
  teachSubject: Array<string>;
  price_min: number,
  price_max: number,
  duty_time: Array<Date>
}