import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { User } from 'libs/prisma/userClient';
import { UpdatedUserNameEvent } from '../event/updated-user-name.event';
import { PrismaService } from '../prisma.service';
import { UpdateUserCommand } from './update-user.command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, name, password, role } = command;

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(password && { password: await argon2.hash(password) }),
      },
    });

    if (name) {
      this.eventBus.publish(new UpdatedUserNameEvent(id));
    }

    return user;
  }
}
