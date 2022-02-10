import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectService } from '@src/subject/subject.service';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';

@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
    private readonly subjectService: SubjectService
  ) {}

  async findTutors(): Promise<Tutor[]> {
    const tutors = await this.tutorModel.find().exec();
    return tutors;
  }

  async getTutor(tutorId: string) {
    const tutor = await this.findTutor(tutorId);
    return {
      id: tutor.tutorId,
      firstName: tutor.first_name,
      lastName: tutor.last_name,
    };
  }

  async insertTutor(
    firstName,
    lastName,
    email,
    phone,
    username,
    userType,
    gender,
    tutorId,
    avgRating,
    successMatch,
    teachSubject,
    priceMin,
    priceMax,
    dutyTime : Array<Date>
  ): Promise<string> {
    const newTutor = new this.tutorModel({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      username: username,
      user_type: userType,
      gender: gender,
      tutorId: tutorId,
      avgRating: avgRating,
      successMatch: successMatch,
      teachSubject: teachSubject,
      price_min :  priceMin,
      price_max : priceMax,
      duty_time : dutyTime
    });
    await newTutor.save();
    return 'Inserted tutor';
  }


  recommendTutor(subjects: Array<string>) {
    return '';
  }

  async matchTutor(student_id:string , subject_name:string , level:string , pricemin:number , pricemax:number , availability_stu:Date[]){
    const subject = await this.subjectService.findByTitleAndLevel(subject_name,level);
    return subject;
  }



  private async findTutor(tutorId: string): Promise<Tutor> {
    let tutor;
    try {
      tutor = await this.tutorModel.findById(tutorId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tutor.');
    }
    if (!tutor) {
      throw new NotFoundException('Could not find tutor.');
    }
    return tutor;
  }
}