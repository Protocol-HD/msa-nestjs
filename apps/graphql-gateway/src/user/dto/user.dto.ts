import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: number;
}
