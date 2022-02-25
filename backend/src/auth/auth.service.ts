import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const foundUsername = await this.studentModel
      .findOne({ username: username })
      .lean();
    const foundEmail = await this.studentModel.findOne({ email: email }).lean();
    if (foundUsername && foundEmail) {
      throw new NotFoundException('duplicate username and email');
    }
    if (foundUsername) {
      throw new NotFoundException('duplicate username');
    }
    if (foundEmail) {
      throw new NotFoundException('duplicate email');
    }
    const pass = password;
    try {
      const imageUrl = await this.s3Service.uploadFile(username, image);
      const saltOrRounds = 10;
      const hashed_password = await bcrypt.hash(pass, saltOrRounds);
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
      const newS = await newStudent.save();
      const { password, ...result } = newS.toObject();
      return result;
    } catch (err) {
      throw err;
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
    const foundUsername = await this.tutorModel
      .findOne({ username: username })
      .lean();
    const foundEmail = await this.tutorModel.findOne({ email: email }).lean();
    if (foundUsername && foundEmail) {
      throw new NotFoundException('duplicate username and email');
    }
    if (foundUsername) {
      throw new NotFoundException('duplicate username');
    }
    if (foundEmail) {
      throw new NotFoundException('duplicate email');
    }
    const pass = password;
    try {
      const imageUrl = await this.s3Service.uploadFile(username, image);
      const saltOrRounds = 10;
      const hashed_password = await bcrypt.hash(pass, saltOrRounds);
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

      const newT = await newTutor.save();
      const { password, ...result } = newT.toObject();
      return result;
    } catch (err) {
      throw err;
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
          .lean();
        break;
      case 't':
        user = await this.tutorModel.findOne({ username: newUsername }).lean();
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

  async login(body: any) {
    let user;
    switch (body.username.split(' ')[0]) {
      case 's':
        user = await this.studentModel
          .findOne({ username: body.username.split(' ')[1] })
          .lean();
        break;
      case 't':
        user = await this.tutorModel
          .findOne({ username: body.username.split(' ')[1] })
          .lean();
        break;
      default:
        throw new ForbiddenException('wrong user type');
        break;
    }

    const { password, ...result } = user;
    const payload = { username: user.username, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        ...result,
      },
    };
  }
}
