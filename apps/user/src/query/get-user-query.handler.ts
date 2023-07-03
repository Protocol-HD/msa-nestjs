import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/userClient';
import { PrismaService } from '../prisma.service';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetUserQuery): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { email: query.email },
    });
  }
}
