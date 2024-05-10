import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Matches, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @MinLength(5, { message: 'Username must have atleast 5 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;

  @ApiProperty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { 
    message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.' 
  })
  password: string;
}
