import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'libs/prisma/userClient';
import { UserRepository } from '../repository/user.repository';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return await this.userRepository.findOneBy({
      where: { email: query.email },
    });
  }
}
