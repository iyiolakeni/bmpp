import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Email{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    subject: string;

    @CreateDateColumn()
    date: Date;

    @Column()
    message: string;
    
    @Column({nullable: true})
    name: string;
    
    @Column({nullable: true})
    cc: string;
}