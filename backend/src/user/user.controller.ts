import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Get('test')
  getHello(): Promise<string> {
    console.log(123);
    return this.userService.getHello();
  }

  
}
