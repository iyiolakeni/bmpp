import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../src/user/entities/user.entity'
import {Form} from '../src/form/entities/form.entity'
import { MerchantID } from 'src/merchantID/merchantID.entity';
import { Pos } from 'src/pos/pos.entity';
import { Email } from 'src/email/email.entity';



@Module({
  imports: [
      TypeOrmModule.forFeature([User, Form, MerchantID, Pos, Email]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'dpg-cov3cigl6cac73bevrgg-a',
          port: 5432,
          password: 'd2nzHHmvhnh7ZhMUsSJwe1za3rhzy3kY',
          username: 'postgress',
          database: 'bmp_db',
          entities: [User, Form, MerchantID, Pos, Email],
          synchronize: true,
          // logging: true,
        }),
      ],
      exports: [TypeOrmModule],
})
export class DatabaseModule {}
