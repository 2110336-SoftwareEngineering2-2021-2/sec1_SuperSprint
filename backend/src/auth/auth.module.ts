import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentSchema } from '../models/student.model';
import { TutorSchema } from '../models/tutor.model';
import { S3Service } from '@src/services/S3Sevices.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Tutor', schema: TutorSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, S3Service],
})
export class AuthModule {}
