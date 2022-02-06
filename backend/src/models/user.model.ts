import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
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
    user_type: {
      type: String,
      required: true,
    },
    gender: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  user_type: string;
  gender: string;
}
