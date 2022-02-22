import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const StudentSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  preferSubject: [
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
  password: string;
  gender: string;
  profileUrl: string;
  preferSubject: Array<string>;
}
