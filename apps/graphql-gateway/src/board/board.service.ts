import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Observable } from 'rxjs';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  getBoards(): Observable<BoardDto[]> {
    return this.boardClient.send({ cmd: 'getBoards' }, {});
  }

  createBoard(input: CreateBoardDto): Observable<BoardDto> {
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }
}
