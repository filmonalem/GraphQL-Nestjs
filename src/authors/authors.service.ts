import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findOneById(id: number): Promise<Author> {
    return this.authorsRepository.findOne({ where: { id } });
  }

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorInput);
    return this.authorsRepository.save(author);
  }

  async update(
    id: number,
    updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    await this.authorsRepository.update(id, updateAuthorInput);
    return this.authorsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
