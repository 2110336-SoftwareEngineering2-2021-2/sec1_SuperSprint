import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from '../models/student.model';
import { TutorModule } from '@src/tutor/tutor.module';
import { S3Service } from '@src/services/S3Sevices.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    TutorModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [StudentController],
  providers: [StudentService, S3Service],
})
export class StudentModule {}
