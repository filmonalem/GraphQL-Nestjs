import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  bio?: string;
}
