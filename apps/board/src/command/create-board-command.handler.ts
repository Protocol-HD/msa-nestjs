import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBoardCommand } from './create-board.command';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'libs/entities/board.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler
  implements ICommandHandler<CreateBoardCommand>
{
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async execute(command: CreateBoardCommand): Promise<BoardEntity> {
    const { title, content, email } = command;

    const observableData = this.userClient.send({ cmd: 'getUser' }, email);

    const user: UserEntity = await firstValueFrom(observableData);

    const board = new BoardEntity();
    board.title = title;
    board.content = content;
    board.userId = user.id;
    board.author = user.name;

    await this.boardRepository.save(board);

    return board;
  }
}
