import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBoardsQuery } from './get-boards.query';
import { BoardEntity } from 'libs/entities/board.entity';

@QueryHandler(GetBoardsQuery)
export class GetBoardsQueryHandler implements IQueryHandler<GetBoardsQuery> {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async execute(query: GetBoardsQuery): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }
}
