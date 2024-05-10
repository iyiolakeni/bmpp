import { Controller, Post, Body, UnauthorizedException, Res, Req, Session } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginDto } from './dto/create-login-api.dto';
import { Request, Response } from 'express';

@Controller('users')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    const { username, password } = loginDto;
    try {
      const { user, jobPosition } = await this.loginService.findByUsernameAndPassword(username, password, req);
      return res.json({ success: true, user, jobPosition });
    } catch (error) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  @Post('logout')
  async logout(@Session() session: Record<string, any>): Promise<void> {
    if (!session.user) {
      throw new UnauthorizedException('User is not logged in');
    }
    // Clear user information from the session upon logout
    delete session.user;
  }
}
