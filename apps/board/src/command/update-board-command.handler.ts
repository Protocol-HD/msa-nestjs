import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'libs/entities/board.entity';
import { Repository } from 'typeorm';
import { UpdateBoardCommand } from './update-board.command';

@Injectable()
@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler
  implements ICommandHandler<UpdateBoardCommand>
{
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async execute(command: UpdateBoardCommand): Promise<BoardEntity> {
    const { id, title, content, author } = command;

    let board = await this.boardRepository.findOne({ where: { id } });

    board = {
      ...board,
      ...(title && { title }),
      ...(content && { content }),
      ...(author && { author }),
    };

    await this.boardRepository.save(board);

    return board;
  }
}
