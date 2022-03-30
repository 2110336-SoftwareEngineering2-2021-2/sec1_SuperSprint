import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  Param,
  Injectable,
  UploadedFile,
  UseGuards,
  Delete,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Chat } from '../models/chat.model';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('request')
  @ApiBody({ type: String })
  async addChat(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
  ) {
    const chat = await this.chatService.requestChat(tutorId, studentId);
    return { chat };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteChat(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
  ) {
    const chatId = await this.chatService.deleteChat(tutorId, studentId);
    return { deletedChat: chatId };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getChat(
    @Query('tutorId') tutorId: string,
    @Query('studentId') studentId: string,
  ) {
    const chat = await this.chatService.getChat(tutorId, studentId);
    return chat;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getChatsTutor')
  async getChatsTutor(@Query('tutorId') tutorId: string) {
    console.log(tutorId);
    return await this.chatService.getChatTutor(tutorId);
  }

  @Get('getChatsStudent')
  async getChatsStudent(@Query('studentId') studentId: string) {
    console.log(studentId);
    return await this.chatService.getChatStudent(studentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('tutorAcceptChat/:chatId')
  async tutorAcceptChat(@Param('chatId') chatId: string) {
    const chat = await this.chatService.tutorAcceptChat(chatId);
    return { chat: chat };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('declineChat/:chatId')
  async declineChat(@Param('chatId') chatId: string) {
    console.log('test', chatId);
    await this.chatService.declineChat(chatId);
    return { chatId: chatId };
  }
}
