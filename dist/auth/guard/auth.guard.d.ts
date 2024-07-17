import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private userService;
    private authService;
    constructor(jwtService: JwtService, userService: UserService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
