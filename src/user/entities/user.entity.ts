import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { JobPosition } from './user.enum';
import * as bcrypt from 'bcryptjs';

@Entity('user_table')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10); 
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password); 
  }

  @Column({
    type: 'enum',
    enum: JobPosition,
  })
  jobPosition: JobPosition;
}
export { JobPosition };

