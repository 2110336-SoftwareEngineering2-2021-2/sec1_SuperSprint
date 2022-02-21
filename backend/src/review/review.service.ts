// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Review } from '@src/models/review.model';

// @Injectable()
// export class StudentService {
//   private students: Student[] = [];

//   constructor(
//     @InjectModel('Student') private readonly studentModel: Model<Student>,
//   ) {}

//   async getStudent(studentId: string) {
//     const student = await this.findStudent(studentId);
//     return {
//       firstName: student.firstName,
//       lastName: student.lastName,
//       email: student.email,
//       phone: student.phone,
//       username: student.username,
//       userType: student.userType,
//       gender: student.gender,
//       preferredSubject: student.preferredSubject,
//     };
//   }

//   async getStudents() {
//     const students = await this.studentModel.find();
//     return students;
//   }

//   async getPreferredSubject(studentId: string): Promise<Array<string>> {
//     console.log(['getPreferredSubject', studentId]);
//     const student = await this.findStudent(studentId);
//     return student.preferredSubject;
//   }

//   chooseTutor(studentId: string, tutorId: string) {
//     console.log([studentId, 'choose', tutorId]);
//     return 'pending';
//   }

//   async insertStudent(
//     firstName,
//     lastName,
//     email,
//     phone,
//     username,
//     userType,
//     gender,
//     preferredSubject,
//   ): Promise<any> {
//     const newStudent = new this.studentModel({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phone: phone,
//       username: username,
//       userType: userType,
//       gender: gender,
//       preferredSubject: preferredSubject,
//     });
//     await newStudent.save();
//     return { studentId: newStudent.id };
//   }

//   private async findStudent(id: string): Promise<Student> {
//     let student;
//     try {
//       student = await this.studentModel.findById(id).exec();
//     } catch (error) {
//       throw new NotFoundException('Could not find student.');
//     }
//     if (!student) {
//       throw new NotFoundException('Could not find student.');
//     }
//     return student;
//   }
// }
