import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/entities/user.entity';
import { Email } from './email.entity';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './createEmail.dto';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter;

  constructor(
    
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}
  
  async onModuleInit() {
    await this.init();
  }
    // {
  //   // Create a transporter
  //   this.transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'your-email@gmail.com', // You may consider using a dedicated email for sending emails
  //       pass: 'your-password',
  //     },
  //   });
  // }

  async init() {
    try {
      let testAccount = await nodemailer.createTestAccount();
  
      console.log('Ethereal account details:', testAccount);
  
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    } catch (error) {
      console.error('Failed to create Ethereal account:', error);
    }
  }

  async sendEmail(dto: CreateEmailDto) {
    const { from, to, subject, message } = dto;

    if (!from) {
      throw new Error('No sender defined');
    }
  
    if (!dto.to) {
      throw new Error('No recipients defined');
    }
  
    await this.transporter.sendMail({
      from: dto.from, // Use the user's email
      to: dto.to,
      subject: dto.subject,
      text: dto.message,
    });
  
    const email = this.emailRepository.create(dto);
    await this.emailRepository.save(email);
  }

  async getAllEmails() {
    return this.emailRepository.find();
  }
}
