import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/global/guard/auth.guard';

@Controller('user')
export class UserController {

    @Post(`/session`)
    @UseGuards(AuthGuard)
    public async user(@Request() req: any) {
        return req.user;
    }

}
