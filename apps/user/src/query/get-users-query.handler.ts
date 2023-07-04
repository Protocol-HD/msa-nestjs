import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'libs/prisma/userClient';
import { PrismaService } from '../prisma.service';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
