import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'libs/prisma/userClient';
import { UserRepository } from '../repository/user.repository';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    console.log('GetUserByIdQueryHandler', query);
    return await this.userRepository.findOneById({ id: query.id });
  }
}
