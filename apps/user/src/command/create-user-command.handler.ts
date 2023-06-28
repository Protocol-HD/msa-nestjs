import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CreateUserEvent } from '../event/create-user.event';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const { name, email, password, role } = command;
    const user = new UserEntity();
    user.id = uuid.v4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;
    await this.userRepository.save(user);

    this.eventBus.publish(new CreateUserEvent());

    return user;
  }
}
