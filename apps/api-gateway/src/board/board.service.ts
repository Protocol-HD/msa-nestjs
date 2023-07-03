import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Board } from '@prisma/boardClient';
import { Observable } from 'rxjs';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  getBoards(): Observable<Board[]> {
    return this.boardClient.send({ cmd: 'getBoards' }, {});
  }

  createBoard(input: CreateBoardDto): Observable<Board> {
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }
}
