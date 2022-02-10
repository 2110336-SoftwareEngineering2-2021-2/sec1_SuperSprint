import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';

const Schema = mongoose.Schema;

export const StudentSchema = new mongoose.Schema({
  ...UserSchema.obj,
  preferredSubject: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  userType: string;
  gender: string;
  preferredSubject: Array<string>;
}
