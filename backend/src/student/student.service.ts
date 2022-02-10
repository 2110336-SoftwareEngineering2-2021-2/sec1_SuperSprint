import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from '@src/models/subject.model';
import { Model } from 'mongoose';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async getStudent(studentId: string) {
    const student = await this.findStudent(studentId);
    return {
      firstName: student.first_name,
      lastName: student.last_name,
      email: student.email,
      phone: student.phone,
      username: student.username,
      userType: student.user_type,
      gender: student.gender,
      preferredSubject: student.preferredSubject,
    };
  }

  async getPreferredSubject(studentId: string): Promise<Array<string>> {
    console.log(['getPreferredSubject', studentId]);
    const student = await this.findStudent(studentId);
    return student.preferredSubject;
  }

  chooseTutor(studentId: string, tutorId: string) {
    console.log([studentId, 'choose', tutorId]);
    return 'pending';
  }

  async insertStudent(stuFirstName:string ,stuLastName:string ,  stuEmail:string , stuPhone:string , stuUserName:string ,  stuUserType:string , stuGender:string,  stuprefSubj:Array<string> ):Promise<string>{
    console.log(stuprefSubj);
    const newStudent = new this.studentModel({
      first_name: stuFirstName,
      last_name: stuLastName,
      email: stuEmail,
      phone: stuPhone,
      username: stuUserName,
      user_type: stuUserType,
      gender: stuGender,
      preferredSubject: stuprefSubj 
    });
    const result = await newStudent.save();
    return result.id;
  }

  async getStudents(){
    const students = await this.studentModel.find();
    return students;
  }

  async getOneStudent(id:string){
    const student = await this.findStudent(id)
    return student;
  }

  async updateStudent(id:string ,stuFirstName:string ,stuLastName:string ,  stuEmail:string , stuPhone:string , stuUserName:string ,  stuUserType:string , stuGender:string,  stuprefSubj:Array<string>){
    console.log(stuLastName);
    const updateStudent = await this.findStudent(id);
    if (stuFirstName){
      updateStudent.first_name = stuFirstName;
    }
    if (stuLastName){
      console.log('go to if lastname')
      updateStudent.last_name = stuLastName;
    }
    if(stuEmail){
      updateStudent.email= stuEmail;
    }
    if(stuPhone){
      updateStudent.phone= stuPhone;
    }
    if(stuUserName){
      updateStudent.username= stuUserName;
    }
    if(stuUserType){
      updateStudent.user_type= stuUserType;
    }
    if(stuGender){
      updateStudent.gender= stuGender;
    }
    if(stuprefSubj){
      updateStudent.preferredSubject= stuprefSubj;
    }
    console.log(updateStudent)
    const student = await updateStudent.save();
    return null ;

  }

  async deleteOneStudent(id:string){
    const result = await this.studentModel.deleteOne({_id: id}).exec()
    if (result.deletedCount === 0){
      throw new NotFoundException("Delete Fail");
    }
    return null;
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