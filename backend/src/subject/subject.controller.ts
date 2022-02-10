import { Controller, Get, Post ,Body} from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async addSubject( @Body('title') title:string , @Body('level') level:string , @Body('description') description:string){
    const generatedId = await this.subjectService.insertSubject(title,level,description);
    return {id: generatedId};
  }

}