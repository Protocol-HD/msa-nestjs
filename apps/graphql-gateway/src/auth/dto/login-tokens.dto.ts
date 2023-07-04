import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginTokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
