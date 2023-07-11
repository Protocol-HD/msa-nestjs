import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { Prisma, User } from 'libs/prisma/userClient';
import { CreateUserEvent } from '../event/create-user.event';
import { UserRepository } from '../repository/user.repository';
import { CreateUserCommand } from './create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { name, email, password, role } = command;

    const data: Prisma.UserCreateInput = {
      name,
      email,
      password: await argon2.hash(password),
      role,
    };

    const createdUser = await this.userRepository.create({ data: data });

    this.eventBus.publish(new CreateUserEvent());

    return createdUser;
  }
}
