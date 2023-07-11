import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Board } from 'libs/prisma/boardClient';
import { BoardRepository } from '../repository/board.repository';
import { UpdateBoardCommand } from './update-board.command';

@Injectable()
@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler
  implements ICommandHandler<UpdateBoardCommand>
{
  constructor(private readonly boardRepository: BoardRepository) {}

  async execute(command: UpdateBoardCommand): Promise<Board> {
    const { id, title, content, author } = command;

    const board = await this.boardRepository.update(
      { id },
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(author && { author }),
      },
    );

    return board;
  }
}
