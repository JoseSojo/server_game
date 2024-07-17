import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../../constant';
  import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
  
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private userService: UserService,
      private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const session = await this.authService.findSessionByToken({ token });

      request['user'] = await this.userService.findByEmail({ email:session.userReference.email });
      request['user'].password = ``;
      request['session'] = session;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}