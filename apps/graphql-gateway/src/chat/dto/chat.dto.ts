import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatDto {
  @Field()
  channel: string;

  @Field()
  name: string;

  @Field()
  message: string;
}
