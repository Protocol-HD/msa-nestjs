import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@InputType()
export class CreateUserDto extends PickType(PartialType(UserDto, InputType), [
  'name',
  'email',
  'password',
  'role',
]) {}
