import { Controller, Get, Post, Body } from '@nestjs/common';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  addTutor(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('userType') userType: string,
    @Body('gender') gender: string,
    @Body('tutorId') tutorId: string,
    @Body('avgRating') avgRating: number,
    @Body('successMatch') successMatch: number,
    @Body('teachSubject') teachSubject: Array<string>,
    @Body('priceMin') priceMin: number,
    @Body('priceMin') priceMax: number,
    @Body('dutyTime') dutyTime: Array<String>,
  ): Promise<string> {
    const dutyTime2 = JSON.parse(JSON.stringify(dutyTime));
    return this.tutorService.insertTutor(
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
      dutyTime2
    );
  }

  @Get('match')
  async matchTutor(
    @Body('student_id') student_id:string , 
    @Body('subject_name') subject_name:string , 
    @Body('level') level:string , 
    @Body('priceMin') pricemin:number ,
    @Body('priceMax') pricemax:number , 
    @Body('availability_stu') availability_stu:Date[] // Date can't get in range so we have to cal duration ???
    ){
    return await this.tutorService.matchTutor(student_id,subject_name,level,pricemin,pricemax,availability_stu);
  }
}