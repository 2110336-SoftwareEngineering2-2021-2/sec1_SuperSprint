import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject } from '../models/subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('Subject') private readonly subjectModel: Model<Subject>,
  ) {}

  async getName(subjectId: string) {
    const subject = await this.findSubject(subjectId);
    return subject.title;
  }

  private async findSubject(id: string): Promise<Subject> {
    let subject;
    try {
      subject = await this.subjectModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find subject.');
    }
    if (!subject) {
      throw new NotFoundException('Could not find subject.');
    }
    return subject;
  }

  async insertSubject(title: string, level: string, description: string) {
    const newSubject = new this.subjectModel({
      title,
      level,
      description,
    });
    await newSubject.save();
    return { subjectId: newSubject._id };
  }

  async findByTitleAndLevel(title: string, level: string) {
    return await this.subjectModel.findOne({ title: title, level: level });
  }
}