import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
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
    userType: {
      type: String,
      required: true,
    },
    gender: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  userType: string;
  gender: string;
}
