import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Board } from 'libs/prisma/boardClient';
import { BoardRepository } from '../repository/board.repository';
import { GetBoardsQuery } from './get-boards.query';

@QueryHandler(GetBoardsQuery)
export class GetBoardsQueryHandler implements IQueryHandler<GetBoardsQuery> {
  constructor(private readonly boardRepository: BoardRepository) {}

  async execute(query: GetBoardsQuery): Promise<Board[]> {
    return await this.boardRepository.findAll();
  }
}
