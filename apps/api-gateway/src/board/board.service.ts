import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BoardEntity } from 'libs/entities/board.entity';
import { Observable } from 'rxjs';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  createBoard(input: CreateBoardDto): Observable<BoardEntity> {
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }

  getBoards(): Observable<BoardEntity[]> {
    return this.boardClient.send({ cmd: 'getBoards' }, {});
  }
}
