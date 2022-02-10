import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getHello(): Promise<string> {
    const newUser = new this.userModel({
      first_name: 'John2',
      last_name: 'Doe',
      email: 'john2@gmail.com',
      phone: '0990603336',
      username: 'john',
      user_type: 'student',
      gender: 'male',
    });
    await newUser.save();
    // const data = await this.userModel.find();
    // console.log(data);
    return 'Hello World!2';
  }


  async getAllUsers(): Promise<User[]> {
    const Users = await this.userModel.find().exec();
    return Users.map((e) => ({
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      phone: e.phone,
      username: e.username,
      user_type: e.user_type,
      gender: e.gender
    }));
  }

}
