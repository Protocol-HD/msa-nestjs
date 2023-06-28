import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

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

  async execute(command: UpdateUserCommand): Promise<void> {
    const { id, name, password, role } = command;

    let user = await this.userRepository.findOne({ where: { id } });

    const hashedPassword = await argon2.hash(password);

    user = {
      ...user,
      ...(name && { name }),
      ...(password && { hashedPassword }),
      ...(role && { role }),
    };

    await this.userRepository.save(user);
  }
}
