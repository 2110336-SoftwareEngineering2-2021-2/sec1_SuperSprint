import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async getStudents() {
    const students = await this.studentModel.find();
    return students;
  }

  async getStudent(studentId: string) {
    const student = await this.findStudent(studentId);
    return {
      firstName: student.firstName,
      lasatName: student.lastName,
      email: student.email,
      phone: student.phone,
      username: student.username,
      gender: student.gender,
      profileUrl: student.profileUrl,
      preferSubject: student.preferSubject,
    };
  }

  async getPreferSubject(studentId: string): Promise<Array<string>> {
    const student = await this.findStudent(studentId);
    return student.preferSubject;
  }

  chooseTutor(studentId: string, tutorId: string) {
    console.log([studentId, 'choose', tutorId]);
    return 'pending';
  }

  private async findStudent(id: string): Promise<Student> {
    let student;
    try {
      student = await this.studentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find student.');
    }
    if (!student) {
      throw new NotFoundException('Could not find student.');
    }
    return student;
  }
}
