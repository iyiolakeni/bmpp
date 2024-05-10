import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { ImapService } from './imap.service';
import { CreateEmailDto } from './createEmail.dto';

@Controller('emails')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('send')
  async sendEmail(@Body() createEmailDto: CreateEmailDto) {
    try {
      await this.emailService.sendEmail(createEmailDto);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('receive')
  async receiveEmails(@Req() req: Request) {
    const userEmail = req.user.email;
    
    try {
        const user = await this.userRepository.findOne({ where: { email: userEmail } });
      if (!user) throw new Error('User not found');

      const emails = await this.imapService.receiveEmails(user);
      return { emails };
    } catch (error) {
      return { error: 'Failed to receive emails' };
    }
  }

  @Get('allemail')
  async getAllEmails() {
    return await this.emailService.getAllEmails();
  }
}
