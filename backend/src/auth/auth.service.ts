import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Student } from '../models/student.model';
import * as bcrypt from 'bcrypt';
import { S3Service } from '@src/services/S3Sevices.service';

@Injectable()
export class AuthService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    private readonly s3Service: S3Service,
  ) {}
  async insertStudent(
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    gender,
    profileUrl,
    preferSubject,
  ): Promise<any> {
    const student = await this.studentModel
      .findOne({ username: username })
      .exec();

    if (!student) {
      const imageUrl = await this.s3Service.uploadFile(profileUrl);
      const saltOrRounds = 10;
      const hashed_password = await bcrypt.hash(password, saltOrRounds);
      const newStudent = new this.studentModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        profileUrl: imageUrl,
        username: username,
        password: hashed_password,
        gender: gender,
        preferSubject: preferSubject,
      });
      await newStudent.save();
      return { studentId: newStudent.id };
    } else {
      return { studentId: -1 }; //! username duplicate
    }
  }
  async insertTutor(
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    gender,
    profileUrl,
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ): Promise<any> {
    const tutor = await this.tutorModel.findOne({ username: username }).exec();
    console.log(tutor);
    if (!tutor) {
      const saltOrRounds = 10;
      const hashed_password = await bcrypt.hash(password, saltOrRounds);
      const newTutor = new this.tutorModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        username: username,
        password: hashed_password,
        gender: gender,
        profileUrl: profileUrl,
        avgRating: avgRating,
        successMatch: successMatch,
        teachSubject: teachSubject,
        priceMin: priceMin,
        priceMax: priceMax,
        dutyTime: dutyTime,
      });
      await newTutor.save();
      return { tutorId: newTutor._id };
    } else {
      return { tutorId: -1 };
    }
  }
}
