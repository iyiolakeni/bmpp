import {ApiProperty} from "@nestjs/swagger";
import {Status} from "./enums/status.enum";
import {PTSP} from "./enums/ptsp.enum";
import {Accounts} from "./enums/accounts.enum";
import { Model } from "./enums/model.enum";
import { Processor } from "./enums/processor.enum";


export class createPosDto{
    @ApiProperty()
    Pos_RequestId: string;

    NumberOfPos: number;

    @ApiProperty()
    status: Status;
}