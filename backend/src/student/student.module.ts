import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from '../models/student.model';

import { TutorModule } from '@src/tutor/tutor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    TutorModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}