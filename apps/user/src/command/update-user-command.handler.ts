import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
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

    return user;
  }
}
