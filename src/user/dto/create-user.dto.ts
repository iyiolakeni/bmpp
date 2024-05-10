import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    Matches,
    MinLength,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { JobPosition } from '../entities/user.enum';

export class CreateUserDto {

    // @PrimaryGeneratedColumn()
    // id: number;

    
    @ApiProperty()
    @MinLength(5, { message: 'Username must have atleast 5 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alpha numeric chars.',
    })
  username: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { 
    message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.' 
  })
  password: string;

  @ApiProperty()
  // @IsEnum(JobPosition)
  jobPosition: JobPosition;
}
