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

    @Column()
    NumberOfPos: number;

    @Column()
    Pos_RequestId: string;

    @Column("text", {array: true})
    Pos_SerialNumber: string[];

    @Column()
    Pos_Accounts: Accounts;

    @Column({type: 'enum', enum: PTSP})
    PTSP: PTSP;

    @Column({type: 'enum', enum: Model, default: Model.CASTLES_TECHNOLOGY_VEGA3000})
    Pos_Model: Model;

    @Column({type: 'enum', enum: Processor, default: Processor.PAYMENT_PROCESSOR})
    Pos_Processor: Processor;

    @Column({type:'enum', enum: Status, default: Status.PENDING})
    status: Status;

}