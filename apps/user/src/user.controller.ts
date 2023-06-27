import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserCommand } from './command/create-user.command';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(data: CreateUserDto): Promise<any> {
    const { name, email, password } = data;
    return await this.commandBus.execute(
      new CreateUserCommand(name, email, password),
    );
  }
}
