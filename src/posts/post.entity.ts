import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Publisher } from './editorial.entity';
import { Edition } from './edicion.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Publisher, (publisher) => publisher.publications, {
    cascade: true,
  })
  publisher: Publisher;

  @ManyToOne(() => Edition, (edition) => edition.publications, {
    cascade: true,
  })
  edition: Edition;

  @Column({ default: 0 })
  stock: number;
}
