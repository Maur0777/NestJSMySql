import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
