import { InputType, PickType, PartialType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@InputType()
export class UpdateUserDto extends PickType(PartialType(UserDto, InputType), [
  'id',
  'name',
  'password',
  'role',
]) {}
