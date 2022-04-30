import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from '../models/score.model';
import { SubjectSchema } from '../models/subject.model';
import { TutorSchema } from '../models/tutor.model';
import { S3Service } from '../services/S3Sevices.service';
import { AdminSchema } from '../models/admin.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Score', schema: ScoreSchema },
      {
        name: 'Tutor',
        schema: TutorSchema,
      },
      {
        name: 'Subject',
        schema: SubjectSchema,
      },
      {
        name: 'Admin',
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, S3Service],
  exports: [ScoreService],
})
export class ScoreModule {}
