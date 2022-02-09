import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';

export const TutorSchema = new mongoose.Schema({
  ...UserSchema.obj,
  tutorId: String,
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
}
