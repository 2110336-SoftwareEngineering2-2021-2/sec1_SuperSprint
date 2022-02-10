import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TutorSchema } from '../models/tutor.model';
import { SubjectModule } from '@src/subject/subject.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tutor', schema: TutorSchema }]),
    SubjectModule
  ],
  controllers: [TutorController],
  providers: [TutorService],
  exports: [TutorService],
})
export class TutorModule {}