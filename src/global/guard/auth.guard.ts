import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../constant';
  import { Request } from 'express';
import { UserService } from 'src/user/user.service';
  
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    const game = request.headers.game;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.userService.findSessionByToken(token);

      request['user'] = user.data;
      request['token'] = user.token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}