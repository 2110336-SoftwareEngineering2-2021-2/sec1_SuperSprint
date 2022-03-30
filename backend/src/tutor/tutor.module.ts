import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TutorSchema } from '../models/tutor.model';
import { SubjectSchema } from '../models/subject.model';
import { ScoreModule } from '@src/score/score.module';
import { SubjectModule } from '@src/subject/subject.module';
import { S3Service } from '@src/services/S3Sevices.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@src/auth/jwt.strategy';
import { ScoreSchema } from '@src/models/score.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tutor', schema: TutorSchema },
      { name: 'Subject', schema: SubjectSchema },
      { name: 'Score', schema: ScoreSchema },
    ]),
    SubjectModule,
    ScoreModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TutorController],
  providers: [TutorService, S3Service, JwtStrategy],
  exports: [TutorService],
})
export class TutorModule {
  configure(tutor: MiddlewareConsumer) {
    tutor.apply().forRoutes('create');
  }
}
