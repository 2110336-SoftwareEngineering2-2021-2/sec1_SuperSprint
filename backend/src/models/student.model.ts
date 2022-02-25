import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user.model';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

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
    unique: true,
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

export class Student {
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
  preferSubject: Array<string>;
}
