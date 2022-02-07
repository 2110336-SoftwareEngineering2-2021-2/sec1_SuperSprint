import * as mongoose from 'mongoose';
// import { Schema } from 'mongoose';
import { UserSchema } from '../models/user.model';

export const StudentSchema = new mongoose.Schema({
  ...UserSchema.obj,
  studentId: String,
});

export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  user_type: string;
  gender: string;
  studentId: string;
}
