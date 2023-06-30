import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Board } from 'prisma/generated/boardClient';
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

    let board = await this.prismaService.board.findUnique({ where: { id } });

    board = {
      ...board,
      ...(title && { title }),
      ...(content && { content }),
      ...(author && { author }),
    };

    await this.prismaService.board.update({
      where: { id },
      data: board,
    });

    return board;
  }
}
