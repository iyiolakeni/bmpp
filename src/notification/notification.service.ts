// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from 'src/user/entities/user.entity';
import { JobPosition } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNotification(message: string, recipient: string | User): Promise<void> {
    let recipientEmail: string;
    if (typeof recipient === 'string') {
      recipientEmail = recipient;
    } else {
      recipientEmail = recipient.email;
    }

    const notification = this.notificationRepository.create({ message, recipient: recipientEmail, status: 'unread' });
    await this.notificationRepository.save(notification);
  }

  async notifyAccountOfficers(message: string): Promise<void> {
    const accountOfficers = await this.getAccountOfficers();
    for (const officer of accountOfficers) {
      await this.createNotification(message, officer);
    }
  }

  async notifyBusinessDevelopers(message: string): Promise<void> {
    const businessDevelopers = await this.getBusinessDevelopers();
    for (const developer of businessDevelopers) {
      await this.createNotification(message, developer);
    }
  }

  private async getAccountOfficers(): Promise<User[]> {
    return this.userRepository.find({ where: { jobPosition: JobPosition.ACCOUNT_OFFICER } });
  }

  private async getBusinessDevelopers(): Promise<User[]> {
    return this.userRepository.find({ where: { jobPosition: JobPosition.BUSINESS_DEVELOPER } });
  }
}
