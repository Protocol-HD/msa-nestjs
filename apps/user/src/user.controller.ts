import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { CreateUserCommand } from './command/create-user.command';
import { UpdateUserCommand } from './command/update-user.command';
import { GetUserQuery } from './query/get-user.query';
import { GetUsersQuery } from './query/get-users.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'getUser' })
  async getUser(email: string): Promise<UserEntity> {
    return await this.queryBus.execute(new GetUserQuery(email));
  }

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<UserEntity[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserCommand): Promise<UserEntity> {
    const { name, email, password, role } = data;
    return await this.commandBus.execute(
      new CreateUserCommand(name, email, password, role),
    );
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(data: UpdateUserCommand): Promise<UserEntity> {
    const { id, name, password, role } = data;
    return await this.commandBus.execute(
      new UpdateUserCommand(id, name, password, role),
    );
  }
}
