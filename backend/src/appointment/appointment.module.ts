import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentSchema } from '../models/appointment.model';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ChatSchema } from 'src/models/chat.model';
import { ChatService } from '@src/chat/chat.service';
import { ChatModule } from '@src/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ChatModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, ChatService, JwtStrategy],
})
export class AppointmentModule {}
