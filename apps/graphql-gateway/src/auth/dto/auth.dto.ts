import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginAuthOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
