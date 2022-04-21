import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentSchema } from '../models/appointment.model';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TutorSchema } from '@src/models/tutor.model';
import { TutorModule } from '@src/tutor/tutor.module';
import { ChatSchema } from '@src/models/chat.model';
@Module({
  imports: [
    TutorModule,
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
      { name: 'Tutor', schema: TutorSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtStrategy],
})
export class AppointmentModule {}
