import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { Prisma, User } from 'prisma/generated/UserClient';
import { CreateUserEvent } from '../event/create-user.event';
import { PrismaService } from '../prisma.service';
import { CreateUserCommand } from './create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
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

    const createdUser = await this.prismaService.user.create({ data });

    this.eventBus.publish(new CreateUserEvent());

    return createdUser;
  }
}
