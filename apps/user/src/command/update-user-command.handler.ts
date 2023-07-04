import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { User } from '@prisma/userClient';
import { UpdateUserNameEvent } from '../event/update-user-name.event';
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

    let user = await this.prismaService.user.findUnique({ where: { id } });
    user = {
      ...user,
      ...(name && { name }),
      ...(role && { role }),
      ...(password && { password: await argon2.hash(password) }),
    };

    await this.prismaService.user.update({
      where: { id },
      data: user,
    });

    if (name) {
      this.eventBus.publish(new UpdateUserNameEvent(id));
    }

    return user;
  }
}
