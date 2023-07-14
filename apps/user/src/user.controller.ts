import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'libs/prisma/userClient';
import { CreateUserCommand } from './command/create-user.command';
import { UpdateUserCommand } from './command/update-user.command';
import { GetUserByIdQuery } from './query/get-user-by-id.query';
import { GetUserQuery } from './query/get-user.query';
import { GetUsersQuery } from './query/get-users.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'getUser' })
  async getUser(email: string): Promise<User> {
    return await this.queryBus.execute(new GetUserQuery(email));
  }

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(id: number): Promise<User> {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @MessagePattern({ cmd: 'getIsExistUser' })
  async getIsExistUser(email: string): Promise<boolean> {
    return await this.queryBus.execute(new GetUserQuery(email));
  }

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserCommand): Promise<User> {
    const { name, email, password, role, loginType } = data;
    return await this.commandBus.execute(
      new CreateUserCommand(name, email, password, role, loginType),
    );
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(data: UpdateUserCommand): Promise<User> {
    const { id, name, password, role } = data;
    return await this.commandBus.execute(
      new UpdateUserCommand(id, name, password, role),
    );
  }
}
