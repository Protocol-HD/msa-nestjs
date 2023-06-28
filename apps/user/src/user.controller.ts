import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserCommand } from './command/create-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'libs/entities/user.entity';
import { GetUsersQuery } from './query/get-users.query';
import { GetUserQuery } from './query/get-user.query';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserDto): Promise<any> {
    const { name, email, password, role } = data;
    return await this.commandBus.execute(
      new CreateUserCommand(name, email, password, role),
    );
  }

  @MessagePattern({ cmd: 'getUsers' })
  async getUsers(): Promise<UserEntity[]> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(email: string): Promise<UserEntity> {
    return await this.queryBus.execute(new GetUserQuery(email));
  }
}
