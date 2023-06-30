import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGuardGQL } from 'libs/auth/auth.guard';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto], { name: 'users' })
  @UseGuards(UserGuardGQL)
  getUsers(): Observable<UserDto[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => UserDto, { name: 'createUser' })
  createUser(@Args('input') input: CreateUserDto): Observable<UserDto> {
    return this.userService.createUser(input);
  }

  @Mutation(() => UserDto, { name: 'updateUser' })
  @UseGuards(UserGuardGQL)
  updateUser(
    @Args('input') input: UpdateUserDto,
    @Context() context,
  ): Observable<UserDto> {
    input.id = context.req.user.id;
    return this.userService.updateUser(input);
  }
}
