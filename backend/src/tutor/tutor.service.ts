import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tutor } from '../models/tutor.model';

@Injectable()
export class TutorService {
  private tutors: Tutor[] = [];

  constructor(
    @InjectModel('Tutor') private readonly tutorModel: Model<Tutor>,
  ) {}

  async findTutors(): Promise<Tutor[]> {
    const tutors = await this.tutorModel.find().exec();
    return tutors;
  }

  async getTutor(tutorId: string) {
    const tutor = await this.findTutor(tutorId);
    return {
      id: tutor.tutorId,
      firstName: tutor.firstName,
      lastName: tutor.lastName,
    };
  }

  recommendTutor(subjects: Array<string>) {
    return '';
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