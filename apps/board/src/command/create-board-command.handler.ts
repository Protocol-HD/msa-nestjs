import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Board, Prisma } from 'libs/prisma/boardClient';
import { User } from 'libs/prisma/userClient';
import { firstValueFrom } from 'rxjs';
import { BoardRepository } from '../repository/board.repository';
import { CreateBoardCommand } from './create-board.command';

@Injectable()
@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler
  implements ICommandHandler<CreateBoardCommand>
{
  constructor(
    private readonly boardRepository: BoardRepository,
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
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

    const createdBoard = await this.boardRepository.create(data);

    return createdBoard;
  }
}
