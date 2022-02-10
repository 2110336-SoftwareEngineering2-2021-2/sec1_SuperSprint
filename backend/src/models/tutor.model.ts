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
});

export interface Tutor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  userType: string;
  gender: string;
  tutorId: string;
  avgRating: number;
  successMatch: number;
  teachSubject: Array<string>;
}
