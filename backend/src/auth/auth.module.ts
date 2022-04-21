import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentSchema } from '../models/student.model';
import { TutorSchema } from '../models/tutor.model';
import { S3Service } from '@src/services/S3Sevices.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { SubjectModule } from '../subject/subject.module';
import { ScoreModule } from '../score/score.module';
import { SubjectService } from '../subject/subject.service';
import { SubjectSchema } from '../models/subject.model';
import { AdminSchema } from '../models/admin.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Tutor', schema: TutorSchema },
      { name: 'Subject', schema: SubjectSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SubjectModule,
    ScoreModule,
  ],
  providers: [
    AuthService,
    S3Service,
    JwtStrategy,
    LocalStrategy,
    SubjectService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
