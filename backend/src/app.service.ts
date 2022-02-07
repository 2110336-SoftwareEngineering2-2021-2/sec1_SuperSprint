import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // console.log(process.env.MONGO_DB_URI);
    return 'Hello World!';
  }
}
