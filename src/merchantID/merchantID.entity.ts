import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('merchant_details')
export class MerchantID{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    MerchantID: string;

    @Column()
    Merchant_Trade_Name: string;

    @Column()
    Business_type: string;

    @Column()
    Business_location: string;

    @Column()
    RC_Number: string;

    @Column()
    No_of_branches: number;

    @Column()
    opening_hours: string;

    @Column()
    website: string;

    @Column()
    Office_address: string;

    @Column()
    LGA: string;

    @Column()
    state: string;

    @Column()
    Name_of_Primary_Contact: string;

    @Column()
    office_No: string;

    // Set value to null can be null
    @Column({nullable: true})
    Mobile_No1: string;

    @Column()
    office_email: string;

    @Column()
    Designation: string;
    
    @Column()
    Name_of_Secondary_Contact: string;

    @Column()
    Designation2: string;

    @Column()
    office_No2: string;

    @Column({nullable: true})
    Mobile_No2: string;

    @Column()
    office_email2: string;
}
