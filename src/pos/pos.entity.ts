import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./enums/status.enum";
import { Processor } from "./enums/processor.enum";
import { Model } from "./enums/model.enum";
import { PTSP } from "./enums/ptsp.enum";
import { Accounts } from "./enums/accounts.enum";

@Entity('POS')
export class Pos{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    NumberOfPos: number;

    @Column({nullable: true})
    Pos_RequestId: string;

    @Column("text", {array: true, nullable: true})
    Pos_SerialNumber: string[];

    @Column({nullable: true})
    Pos_Accounts: Accounts;

    @Column({type: 'enum', enum: PTSP, default: PTSP.DEFAULT})
    PTSP: PTSP;

    @Column({type: 'enum', enum: Model, default: Model.DEFAULT})
    Pos_Model: Model;

    @Column({type: 'enum', enum: Processor, default: Processor.DEFAULT})
    Pos_Processor: Processor;

    @Column({type:'enum', enum: Status, default: Status.PENDING})
    status: Status;

}