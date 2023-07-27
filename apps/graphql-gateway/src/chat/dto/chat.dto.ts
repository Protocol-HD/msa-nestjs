import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatDto {
  @Field()
  channel: string;
  @Field()
  message: string;
}
