import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBoardDto } from 'apps/board/src/dto/create-board.dto';
import { BoardEntity } from 'libs/entities/board.entity';
import { Observable } from 'rxjs';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  createBoard(input: CreateBoardDto): Observable<BoardEntity> {
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }
}
