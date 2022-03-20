import * as mongoose from 'mongoose';

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

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  message: Array<string>;
}
