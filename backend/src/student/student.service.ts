import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../models/student.model';
import { S3Service } from '@src/services/S3Sevices.service';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    private readonly s3Service: S3Service,
  ) {}

  async getStudents() {
    const students = await this.studentModel.find();
    return students;
  }

  async getPreferSubject(studentId: string): Promise<Array<string>> {
    const student = await this.findStudent(studentId);
    return student.preferSubject;
  }

  chooseTutor(studentId: string, tutorId: string) {
    console.log([studentId, 'choose', tutorId]);
    return 'pending';
  }

  async updateStudent(
    id,
    firstName,
    lastName,
    email,
    phone,
    username,
    gender,
    image,
    preferSubject,
  ) {
    const foundUsername = await this.studentModel
      .findOne({ username: username })
      .lean();
    const foundEmail = await this.studentModel.findOne({ email: email }).lean();

    if (foundUsername && foundEmail) {
      throw new ForbiddenException('duplicate username and email');
    }
    if (foundUsername) {
      throw new ForbiddenException('duplicate username');
    }
    if (foundEmail) {
      throw new ForbiddenException('duplicate email');
    }

    const student = await this.studentModel.findById(id);
    await this.s3Service.deleteFile(student.profileUrl);
    const imageUrl = await this.s3Service.uploadFile(username, image);

    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.phone = phone;
    student.username = username;
    student.gender = gender;
    student.profileUrl = imageUrl;
    student.preferSubject = preferSubject;

    const updatedStudent = await student.save();
    const { password, ...result } = updatedStudent;
    return { message: 'successfully update', student: result };
  }

  async getStudentById(id) {
    const student = await this.studentModel.findById(id);
    const { password, ...result } = student;
    return result;
  }

  private async findStudent(id: string): Promise<Student> {
    let student;
    try {
      student = await this.studentModel.findById(id).lean();
    } catch (error) {
      throw new NotFoundException('Could not find student.');
    }
    if (!student) {
      throw new NotFoundException('Could not find student.');
    }
    const { password, ...result } = student;
    return result;
  }
}
