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
    return subject;
  }

  async getSubjectsName() {
    const title = await this.subjectModel.find().distinct('title');
    return title;
  }

  async getSubjects() {
    const title = await this.subjectModel.find();
    return title;
  }

  async getSubjectsByLevel(level: string) {
    return await this.subjectModel.find({ level: level }).lean();
  }

  async getAllSubjectsLevel() {
    const subjectsName = await this.getSubjectsName();
    const subjects = await Promise.all(
      subjectsName.map(async (e) => {
        const levels = await this.subjectModel
          .find({ title: e })
          .distinct('level');
        const levelUse = await Promise.all(
          levels.map(async (l) => {
            const subject = await this.findByTitleAndLevel(e, l);
            // console.log(subject.id);
            return { level: l, id: subject.id };
          }),
        );

        return { [e]: levelUse };
      }),
    );
    return subjects.reduce((previousValue, currentValue) => {
      return { ...previousValue, ...currentValue };
    });
  }

  async getLevels() {
    const level = await this.subjectModel.find().distinct('level');
    return level;
  }

  async insertSubject(
    title: string,
    level: string,
    description: string,
    maxScore: number,
  ) {
    const newSubject = new this.subjectModel({
      title,
      level,
      description,
      maxScore,
    });
    await newSubject.save();
    return { subjectId: newSubject._id };
  }

  async findByTitleAndLevel(title: string, level: string) {
    return await this.subjectModel.findOne({ title: title, level: level });
  }

  private async findSubject(id: string): Promise<Subject> {
    let subject;
    try {
      subject = await this.subjectModel.findById(id).lean();
    } catch (error) {
      throw new NotFoundException('Could not find subject.');
    }
    if (!subject) {
      throw new NotFoundException('Could not find subject.');
    }
    return subject;
  }
}
