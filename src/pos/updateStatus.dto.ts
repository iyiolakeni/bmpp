import {ApiProperty} from "@nestjs/swagger";
import {Status} from "./enums/status.enum";

export class updatePosStatusDto{
    @ApiProperty()
    status: Status;
}