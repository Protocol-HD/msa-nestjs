import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Board } from 'prisma/generated/boardClient';
import { PrismaService } from '../prisma.service';
import { GetBoardsQuery } from './get-boards.query';

@QueryHandler(GetBoardsQuery)
export class GetBoardsQueryHandler implements IQueryHandler<GetBoardsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: GetBoardsQuery): Promise<Board[]> {
    return await this.prismaService.board.findMany();
  }
}
