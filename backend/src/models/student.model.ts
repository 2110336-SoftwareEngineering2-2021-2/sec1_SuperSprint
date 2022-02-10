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


export interface Student extends mongoose.Document{
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  user_type: string;
  gender: string;
  id: string;
  preferredSubject: Array<string>;
}