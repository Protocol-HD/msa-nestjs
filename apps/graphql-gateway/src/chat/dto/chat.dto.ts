import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatDto {
  clientId: string;

  @Field()
  channel: string;

  @Field()
  message: string;
}
