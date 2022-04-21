import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const Schema = mongoose.Schema;

export const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
  },
);

export class Message {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  message: Array<string>;
}
