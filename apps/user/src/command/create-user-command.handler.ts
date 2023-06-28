import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserEvent } from '../event/create-user.event';
import { CreateUserCommand } from './create-user.command';

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
    user.name = name;
    user.email = email;
    user.password = await argon2.hash(password);
    user.role = role;

    await this.userRepository.save(user);

    this.eventBus.publish(new CreateUserEvent());

    return user;
  }
}
