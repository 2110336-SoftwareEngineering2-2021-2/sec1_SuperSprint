import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';
import { Student } from '../models/student.model';
import * as bcrypt from 'bcrypt';
import { S3Service } from '@src/services/S3Sevices.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

@Injectable()
export class AuthService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    private readonly s3Service: S3Service,
    private readonly jwtService: JwtService,
  ) {}
  async insertStudent(
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    gender,
    image,
    preferSubject,
  ): Promise<any> {
    const student = await this.studentModel
      .findOne({ username: username })
      .exec();

    if (!student) {
      const imageUrl = await this.s3Service.uploadFile(image);
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
      console.log(newStudent);
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
    image,
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime,
  ): Promise<any> {
    const tutor = await this.tutorModel.findOne({ username: username }).exec();
    const imageUrl = await this.s3Service.uploadFile(image);
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
        profileUrl: imageUrl,
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

  async validate(username: string, pass: string): Promise<any> {
    const userType = username.split(' ')[0];
    const newUsername = username.split(' ')[1];

    let user;
    switch (userType) {
      case 's':
        user = await this.studentModel
          .findOne({ username: newUsername })
          .exec();
        break;
      case 't':
        user = await this.tutorModel.findOne({ username: newUsername }).exec();
        break;
      default:
        break;
    }
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
    // console.log(pass);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
