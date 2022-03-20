import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../models/chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async getChat(tutorId: string, studentId: string) {
    const res = await this.findChat(tutorId, studentId);
    return res;
  }

  async insertChat(tutorId: string, studentId: string): Promise<any> {
    const newChat = new this.chatModel({
      tutorId,
      studentId,
    });
    console.log(tutorId);
    await newChat.save();
    return newChat._id;
  }

  async deleteChat(tutorId: string, studentId: string) {
    const chat = await this.chatModel.findOne({
      tutorId: tutorId,
      studentId: studentId,
    });
    console.log(chat._id);
    await this.chatModel.deleteOne({ tutorId: tutorId, studentId: studentId });
    return chat._id;
  }

  // PRIVATE -----------------------------------
  private async findChat(tId: string, sId: string): Promise<Chat> {
    let chat;
    try {
      chat = await this.chatModel
        .findOne({ tutorId: tId, studentId: sId })
        .lean();
      if (!chat) {
        return null;
        // return 0;
        // throw new NotFoundException('Could not find score.');
      }
    } catch (error) {
      throw new BadRequestException(`get chat between ${tId} ${sId} failed`);
    }

    return chat;
  }
}
