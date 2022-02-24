import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('Go into validate in local strategy');
    console.log(username);
    // const password = '123456';
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
