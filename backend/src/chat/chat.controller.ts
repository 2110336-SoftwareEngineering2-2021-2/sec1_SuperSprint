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
  @Post('create')
  @ApiBody({ type: String })
  async addChat(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
  ) {
    const newChat = await this.chatService.insertChat(tutorId, studentId);
    return { id: newChat };
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
}
