import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Query(() => Author)
  async author(@Args('id', { type: () => ID }) id: number): Promise<Author> {
    return this.authorsService.findOneById(id);
  }

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    await this.authorsService.delete(id);
    return true;
  }
}
