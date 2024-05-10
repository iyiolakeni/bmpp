import { ApiProperty } from "@nestjs/swagger";

export class createMerchantIdDto{

    @ApiProperty()
    Merchant_Trade_Name: string;

    // @ApiProperty()
    // MerchantID: string;

    @ApiProperty()
    Business_type: string;

    @ApiProperty()
    Business_location: string;

    @ApiProperty()
    RC_Number: string;

    @ApiProperty()
    No_of_branches: number;

    @ApiProperty()
    opening_hours: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    Office_address: string;

    @ApiProperty()
    LGA: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    Name_of_Primary_Contact: string;

    @ApiProperty()
    office_No: string;

    @ApiProperty()
    office_email: string;

    @ApiProperty()
    Designation: string;
    
    @ApiProperty()
    Name_of_Secondary_Contact: string;

    @ApiProperty()
    Designation2: string;

    @ApiProperty()
    office_No2: string;

    @ApiProperty()
    office_email2: string;
}