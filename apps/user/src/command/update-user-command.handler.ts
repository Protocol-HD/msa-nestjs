import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserNameEvent } from '../event/update-user-name.event';
import { UpdateUserCommand } from './update-user.command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserEntity> {
    const { id, name, password, role } = command;

    let user = await this.userRepository.findOne({ where: { id } });
    user = {
      ...user,
      ...(name && { name }),
      ...(role && { role }),
      ...(password && { password: await argon2.hash(password) }),
    };

    await this.userRepository.save(user);

    if (name) {
      this.eventBus.publish(new UpdateUserNameEvent(id, name));
    }

    return user;
  }
}
