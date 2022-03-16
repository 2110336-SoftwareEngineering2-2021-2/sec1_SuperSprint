import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentSchema } from '../models/appointment.model';
import { TutorModule } from '@src/tutor/tutor.module';
import { S3Service } from '@src/services/S3Sevices.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
    ]),
    TutorModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, S3Service],
})
export class AppointmentModule {}
