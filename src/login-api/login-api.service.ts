import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';

interface SessionData {
  user?: User;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsernameAndPassword(username: string, password: string, req: Request): Promise<{ user: User; jobPosition: string }> {
    const session = req.session as SessionData;

    if (session.user) {
      if (session.user.username !== username) {
        throw new UnauthorizedException('Another user is already logged in.');
      } else {
        return { user: session.user, jobPosition: session.user.jobPosition };
      }
    }

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    session.user = user;
    return { user, jobPosition: user.jobPosition };
  }
}
