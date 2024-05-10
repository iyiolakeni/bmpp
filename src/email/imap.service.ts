// imap.service.ts

import { Injectable } from '@nestjs/common';
import Imap from 'imap';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class ImapService {
  private imap: Imap;

  constructor() {
    this.imap = new Imap({
      user: 'your-email@gmail.com', // Replace with the user's email
      password: 'your-password', // Replace with the user's password
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    });
  }

  async receiveEmails(user: User) {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.imap.openBox('INBOX', false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
          };

          const f = this.imap.seq.fetch('1:10', fetchOptions);

          const emails: any[] = [];

          f.on('message', (msg, seqno) => {
            const email: any = {};

            msg.on('body', (stream, info) => {
              let buffer = '';

              stream.on('data', (chunk) => {
                buffer += chunk.toString('utf8');
              });

              stream.once('end', () => {
                const headers = Imap.parseHeader(buffer);
                email.from = headers.from[0];
                email.to = headers.to[0];
                email.subject = headers.subject[0];
                email.date = headers.date[0];
              });
            });

            msg.once('end', () => {
              emails.push(email);
            });
          });

          f.once('error', (err) => {
            reject(err);
          });

          f.once('end', () => {
            resolve(emails);
            this.imap.end();
          });
        });
      });

      this.imap.once('error', (err) => {
        reject(err);
      });

      this.imap.connect();
    });
  }
}
