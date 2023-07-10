import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Board } from 'libs/prisma/boardClient';
import { PrismaService } from '../prisma.service';
import { UpdateBoardCommand } from './update-board.command';

@Injectable()
@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler
  implements ICommandHandler<UpdateBoardCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UpdateBoardCommand): Promise<Board> {
    const { id, title, content, author } = command;

    const board = await this.prismaService.board.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(author && { author }),
      },
    });

    return board;
  }
}
