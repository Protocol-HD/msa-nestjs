import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { UserGuardGQL } from 'libs/auth/auth.guard';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Resolver()
export class UserResolver {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
  ) {}

  @Query(() => [UserDto], { name: 'users' })
  @UseGuards(UserGuardGQL)
  getUsers(): Observable<UserDto[]> {
    return this.userClient.send({ cmd: 'getUsers' }, {});
  }

  @Mutation(() => UserDto, { name: 'createUser' })
  createUser(@Args('input') input: CreateUserDto): Observable<UserDto> {
    return this.userClient.send({ cmd: 'createUser' }, input);
  }

  @Mutation(() => UserDto, { name: 'updateUser' })
  @UseGuards(UserGuardGQL)
  updateUser(
    @Args('input') input: UpdateUserDto,
    @Context() context,
  ): Observable<UserDto> {
    input.id = context.req.user.id;
    return this.userClient.send({ cmd: 'updateUser' }, input);
  }
}
