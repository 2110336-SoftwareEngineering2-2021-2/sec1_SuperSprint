import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  chooseTutor(studentId: string, tutorId: string) {
    console.log([studentId, 'choose', tutorId]);
    return 'pending';
  }
}
