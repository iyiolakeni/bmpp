import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';
import { FormStatus } from './form.enum';
import { CardType } from './card.enum';
import { CategoryBusinessType } from './cate-business.enum';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  //Unique Column
  @Column({unique: true})
  RequestId: string;

  @Column()
  officer_name: string;
  
  @Column()
  MerchantID: string;

  @Column()
  No_of_POS_terminal: number;

  //Location of terminal is to be a list of locations
  @Column('simple-array')
  location_of_terminal: string[];

  @Column('simple-array')
  contact_person: string[];

  @Column('simple-array')
  contact_mobile_no: string[];

  @Column({ type: 'enum', enum:CategoryBusinessType, default:CategoryBusinessType.STORE })
  category_of_merchant_business:CategoryBusinessType;

  @Column()
  bank: string;

  @Column()
  Account_No: number;

  @Column({ type: 'enum', enum: CardType, default: CardType.LOCAL_CARD })
  card_type: CardType;

  // @Column({type: 'enum', enum: POS, default: POS.AIRTIME_VENDING})
  // POS_Use: POS;

  @Column({ type: 'enum', enum: FormStatus, default: FormStatus.PENDING })
  status: FormStatus;

  @Column({nullable: true})
  Notes: string;

  @Column("simple-array",{nullable: true})
  suppportingDocuments: string[];

  //Date of Update
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  //Date of creation
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  generateRequestId() {
    let uniqueNumbers = new Set();
    while (uniqueNumbers.size < 4) {
      uniqueNumbers.add(Math.floor(Math.random() * 10));
    }
    this.RequestId = 'POS' + Array.from(uniqueNumbers).join('');
  }

  @Column({nullable: true})
  ApprovedBy: string;

  @Column({nullable: true})
  AdditionalNotes: string;
}
