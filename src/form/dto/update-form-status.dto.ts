import { ApiProperty } from '@nestjs/swagger';
import { FormStatus } from '../entities/form.enum';

export class UpdateFormStatusDto {
  @ApiProperty({
    enum: [FormStatus.APPROVED, FormStatus.DENIED, FormStatus.IN_PROCESS, FormStatus.DEPLOYED],
    example: FormStatus.APPROVED,
    description: 'New status for the form (APPROVED or DENIED)',
  })
  status: FormStatus;

  @ApiProperty()
  AdditionalNotes:string;

  @ApiProperty()
  ApprovedBy:string;
}
