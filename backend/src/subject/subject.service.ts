import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from '@src/models/subject.model';
import { Model } from 'mongoose';

@Injectable()
export class SubjectService {

  constructor(
    @InjectModel('Subject') private readonly SubjectModel: Model<Subject>,
  ) {}

  async insertSubject(title:string , level:string , description:string){
      const newSubject = new this.SubjectModel({title: title , level: level , description: description});
      const result = await newSubject.save();
      return result.id;

  }

  async findByTitleAndLevel(title:string , level:string){
    return await this.SubjectModel.findOne({title:title,level:level})
  }

}