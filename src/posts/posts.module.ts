import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UsersModule, // Importar el repositorio.
  ],
  providers: [PostsService], // Importar el servicio.
  controllers: [PostsController], // Importar el controlador.
})
export class PostsModule {}
