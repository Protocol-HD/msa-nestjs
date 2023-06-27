import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUsersQuery): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
