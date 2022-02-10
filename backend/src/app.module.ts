import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { ScoreModule } from './score/score.module';
import { SubjectModule } from './subject/subject.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    ScoreModule,
    StudentModule,
    SubjectModule,
    TutorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
