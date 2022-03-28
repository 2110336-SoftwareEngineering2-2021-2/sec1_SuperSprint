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
  async requestChat(tutorId: string, studentId: string) {
    const chat = await this.findChat(tutorId, studentId);
    if (!chat) {
      const newChat = new this.chatModel({
        tutorId,
        studentId,
        accepted: false,
      }).save();
      return newChat;
    }
    return chat;
  }
  async getChatStudent(studentId: string) {
    console.log(studentId);
    const chat = await this.chatModel
      .find({ studentId })
      .populate('tutorId')
      .populate('studentId');
    return chat;
  }

  async getChatTutor(tutorId: string) {
    const chats = await this.chatModel
      .find({ tutorId: tutorId })
      .populate('tutorId')
      .populate('studentId');
    return chats;
  }
  async tutorAcceptChat(chatId: string) {
    // const filter = { tutorId,studentId };
    // const update = { accepted: true };
    const chat = await this.chatModel.findById(chatId);
    chat.accepted = true;
    await chat.save();
    return chat;
  }
  async declineChat(chatId: string) {
    // console.log(chatId);
    const chat = await this.chatModel.findById(chatId);
    console.log(chatId, chat);
    await this.chatModel.deleteOne({ _id: chatId });
    // chat.accepted = false;
    // await chat.save();
    return chat._id;
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
