import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from '../models/score.model';

import { TutorSchema } from '../models/tutor.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Score', schema: ScoreSchema },
      {
        name: 'Tutor',
        schema: TutorSchema,
      },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoreModule {}
