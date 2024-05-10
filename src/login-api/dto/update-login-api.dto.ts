import { PartialType } from '@nestjs/swagger';
import { LoginDto } from './create-login-api.dto';

export class UpdateLoginApiDto extends PartialType(LoginDto) {}
