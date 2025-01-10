import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}
  createPost(post: CreatePostDto) {
    const userFound = this.usersService.getUser(post.authorId);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }
  getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }
  findOnePost(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['authors', 'publisher', 'edition'],
    });
  }
  deletePost(id: number) {
    return this.postsRepository.delete({ id });
  }
  updatePost(id: number, post: CreatePostDto) {
    const postFound = this.postsRepository.findOne({
      where: { id },
    });
    if (!postFound) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const updatePost = Object.assign(postFound, post);
    return this.postsRepository.save(updatePost);
  }
}
