import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'libs/prisma/userClient';
import { PrismaService } from '../prisma.service';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    console.log('GetUserByIdQueryHandler', query);
    return await this.prismaService.user.findUnique({
      where: { id: query.id },
    });
  }
}
