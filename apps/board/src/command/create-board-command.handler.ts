import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/userClient';
import { Board, Prisma } from '@prisma/boardClient';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { CreateBoardCommand } from './create-board.command';

@Injectable()
@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler
  implements ICommandHandler<CreateBoardCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async execute(command: CreateBoardCommand): Promise<Board> {
    const { title, content, email } = command;

    const observableData = this.userClient.send({ cmd: 'getUser' }, email);

    const user: User = await firstValueFrom(observableData);

    const data: Prisma.BoardCreateInput = {
      title,
      content,
      userId: user.id,
      author: user.name,
    };

    const createdBoard = await this.prismaService.board.create({ data });

    return createdBoard;
  }
}
