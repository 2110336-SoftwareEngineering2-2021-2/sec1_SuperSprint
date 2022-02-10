import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';

const Schema = mongoose.Schema;

export const StudentSchema = new mongoose.Schema({
  ...UserSchema.obj,
  studentId: String,
  preferredSubject: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  userType: string;
  gender: string;
  studentId: string;
  preferredSubject: Array<string>;
}