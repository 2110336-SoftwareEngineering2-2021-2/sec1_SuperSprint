import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@src/user/user.module';
import { StudentModule } from '@src/student/student.module';
import { ScoreModule } from '@src/score/score.module';
import { SubjectModule } from '@src/subject/subject.module';
import { TutorModule } from '@src/tutor/tutor.module';
import { AuthModule } from '@src/auth/auth.module';
import { ChatModule } from '@src/chat/chat.module';
import { AppointmentModule } from '@src/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    ScoreModule,
    StudentModule,
    SubjectModule,
    TutorModule,
    UserModule,
    ChatModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
