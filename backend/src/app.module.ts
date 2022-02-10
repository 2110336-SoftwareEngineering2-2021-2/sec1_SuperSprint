import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/tuture_yod'),
    UserModule,StudentModule,SubjectModule,TutorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




