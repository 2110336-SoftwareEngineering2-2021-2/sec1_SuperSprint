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
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Chat } from '../models/chat.model';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('request')
  @ApiOperation({
    summary:
      'Get chat of tutor and student or create new chatroom if not existing',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tutorId: { type: 'string', example: '621c818daefa29db6f3e806f' },
        studentId: { type: 'string', example: '621c8c3d363377298c2bf8b2' },
      },
    },
  })
  @ApiOkResponse({ type: Chat })
  async addChat(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
  ) {
    const chat = await this.chatService.requestChat(tutorId, studentId);
    return { chat };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  @ApiOperation({
    summary: 'Delete chat between tutor and student',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tutorId: { type: 'string', example: '621c818daefa29db6f3e806f' },
        studentId: { type: 'string', example: '621c8c3d363377298c2bf8b2' },
      },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        deleteChat: { type: 'string', example: '6239a861391503e1556c0b1e' },
      },
    },
  })
  async deleteChat(
    @Body('tutorId') tutorId: string,
    @Body('studentId') studentId: string,
  ) {
    const chatId = await this.chatService.deleteChat(tutorId, studentId);
    return { deletedChat: chatId };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  @ApiOperation({
    summary: 'Get chat by tutor id and student id',
  })
  @ApiOkResponse({ type: Chat })
  @ApiQuery({ name: 'tutorId', example: '621c818daefa29db6f3e806f' })
  @ApiQuery({ name: 'studentId', example: '621c8c3d363377298c2bf8b2' })
  async getChat(
    @Query('tutorId') tutorId: string,
    @Query('studentId') studentId: string,
  ) {
    const chat = await this.chatService.getChat(tutorId, studentId);
    return chat;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getChatsTutor')
  @ApiOperation({
    summary: 'Get all chats of tutor whose id is matched',
  })
  @ApiQuery({ name: 'tutorId', example: '621c818daefa29db6f3e806f' })
  @ApiOkResponse({ type: [Chat] })
  async getChatsTutor(@Query('tutorId') tutorId: string) {
    console.log(tutorId);
    return await this.chatService.getChatTutor(tutorId);
  }

  @Get('getChatsStudent')
  @ApiOperation({
    summary: 'Get all chats of student whose id is matched',
  })
  @ApiQuery({ name: 'studentId', example: '621c8c3d363377298c2bf8b2' })
  @ApiOkResponse({ type: [Chat] })
  async getChatsStudent(@Query('studentId') studentId: string) {
    console.log(studentId);
    return await this.chatService.getChatStudent(studentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('tutorAcceptChat/:chatId')
  @ApiOperation({
    summary: 'Tutor accept requested chat',
  })
  @ApiParam({ name: 'chatId', example: '6239a861391503e1556c0b1e' })
  @ApiOkResponse({ type: Chat })
  async tutorAcceptChat(@Param('chatId') chatId: string) {
    const chat = await this.chatService.tutorAcceptChat(chatId);
    return { chat: chat };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('declineChat/:chatId')
  @ApiOperation({
    summary: 'Tutor decline requested chat',
  })
  @ApiParam({ name: 'chatId', example: '6239a861391503e1556c0b1e' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        chatId: { type: 'string', example: '6239a861391503e1556c0b1e' },
      },
    },
  })
  async declineChat(@Param('chatId') chatId: string) {
    console.log('test', chatId);
    await this.chatService.declineChat(chatId);
    return { chatId: chatId };
  }
}
