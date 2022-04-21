import * as mongoose from 'mongoose';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
});

export class Admin {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiHideProperty()
  password: string;
}
