import { DatabaseModule } from 'database/database.module';
import { Module } from '@nestjs/common';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';
import { ImapService } from './imap.service';



@Module({
  imports: [DatabaseModule],
  controllers: [EmailController],
  providers: [EmailService,ImapService],
})
export class EmailModule {}
