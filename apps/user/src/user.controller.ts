import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserCommand } from './command/create-user.command';
import { UpdateUserCommand } from './command/update-user.command';
import { GetUserQuery } from './query/get-user.query';
import { GetUsersQuery } from './query/get-users.query';
import { User } from 'libs/prisma/userClient';
import { GetUserByIdQuery } from './query/get-user-by-id.query';

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

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<User[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserCommand): Promise<User> {
    const { name, email, password, role } = data;
    return await this.commandBus.execute(
      new CreateUserCommand(name, email, password, role),
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
