import { ApiProperty } from "@nestjs/swagger";

export class CreateEmailDto{
    id: number;

    @ApiProperty()
    from: string;

    @ApiProperty()
    to: string;

    @ApiProperty()
    subject: string;

    date: Date;

    @ApiProperty()
    message: string;

    @ApiProperty({nullable: true})
    name: string;
}