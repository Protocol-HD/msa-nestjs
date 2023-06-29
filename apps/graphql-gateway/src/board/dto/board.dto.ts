import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  userId: number;

  @Field()
  author: string;
}
