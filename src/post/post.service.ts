import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(createPostInput);
    return this.postRepository.save(post);
  }

  async update(updatePostInput: UpdatePostInput): Promise<Post> {
    await this.postRepository.update(updatePostInput.id, updatePostInput);
    return this.postRepository.findOne({ where: { id: updatePostInput.id } });
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
