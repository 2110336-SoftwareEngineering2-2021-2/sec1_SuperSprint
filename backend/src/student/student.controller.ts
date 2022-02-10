import { Controller, Body, Get, Post, Injectable, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { TutorService } from '../tutor/tutor.service';
import { Subject } from '@src/models/subject.model';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly tutorService: TutorService,
  ) {}
  // constructor(private readonly tutorService: TutorService) {}
  @Get('recommend')
  async recommendTutor(@Body('studentId') studentId: string) {
    const subjects = await this.studentService.getPreferredSubject(studentId);
    const result = await this.tutorService.recommendTutor(subjects);
    return { tutorList: result };
  }

  @Post('create')
    async addStudent(
        @Body('first_name') stuFirstName:string,
        @Body('last_name') stuLastName:string,
        @Body('email') stuEmail:string,
        @Body('phone') stuPhone:string,
        @Body('username') stuUserName:string,
        @Body('user_type') stuUserType:string,
        @Body('gender') stuGender:string,
        @Body('preferred_subject') stuprefSubj:string,
         ) {
        const stuprefSubj2 = JSON.parse(JSON.stringify(stuprefSubj));
        const generatedId = await this.studentService.insertStudent(
          stuFirstName,
          stuLastName,
          stuEmail,
          stuPhone,
          stuUserName,
          stuUserType,
          stuGender,
          stuprefSubj2
          );
           
        return {id:generatedId} 
    }

  @Get()
  async getAllStudents(){
    const students = await this.studentService.getStudents();
    return students;
  }

  @Get(':id')
  async getOneStudent(@Param('id') id:string){
    const student = await this.studentService.getOneStudent(id);
    return student;
  }

  @Patch(':id')
  async updateStudent( @Param('id') id:string,
    @Body('first_name') stuFirstName:string,
    @Body('last_name') stuLastName:string,
    @Body('email') stuEmail:string,
    @Body('phone') stuPhone:string,
    @Body('username') stuUserName:string,
    @Body('user_type') stuUserType:string,
    @Body('gender') stuGender:string,
    @Body('preferred_subject') stuprefSubj:string,
    
   ){
    let  stuprefSubj2;
    console.log(stuLastName);
    try{
      stuprefSubj2 = JSON.parse(JSON.stringify(stuprefSubj));
    }catch(error){
      stuprefSubj2 = null;
    }
    
    await this.studentService.updateStudent(
      id,
      stuFirstName,
      stuLastName,
      stuEmail,
      stuPhone,
      stuUserName,
      stuUserType,
      stuGender,
      stuprefSubj2
    );
    return null;
   }

  @Delete(':id')
  async deleteTutor(@Param('id') id:string){
    await this.studentService.deleteOneStudent(id);
    return null;
  }

  @Post()
  chooseTutor(
    @Body('studentId') studentId: string,
    @Body('tutorId') tutorId: string,
  ) {
    const status = this.studentService.chooseTutor(studentId, tutorId);
    return { appoinmentStatus: status };
  }

  
  
}