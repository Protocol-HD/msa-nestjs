import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'libs/prisma/userClient';
import { UserRepository } from '../repository/user.repository';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
