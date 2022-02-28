import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TutorSchema } from '../models/tutor.model';
import { ScoreModule } from '@src/score/score.module';
import { SubjectModule } from '@src/subject/subject.module';
import { S3Service } from '@src/services/S3Sevices.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tutor', schema: TutorSchema }]),
    SubjectModule,
    ScoreModule,
  ],
  controllers: [TutorController],
  providers: [TutorService, S3Service],
  exports: [TutorService],
})
export class TutorModule {
  configure(tutor: MiddlewareConsumer) {
    tutor.apply().forRoutes('create');
  }
}
