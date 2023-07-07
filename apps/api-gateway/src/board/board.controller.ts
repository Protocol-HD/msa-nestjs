import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserGuard } from 'libs/auth/auth.guard';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Board } from 'libs/prisma/boardClient';
import { Observable } from 'rxjs';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.BOARD.name)
    private readonly boardClient: ClientProxy,
  ) {}

  @Get('/getBoards')
  getBoards(): Observable<Board[]> {
    return this.boardClient.send({ cmd: 'getBoards' }, {});
  }

  @Post('/createBoard')
  @UseGuards(UserGuard)
  createBoard(@Body() input: CreateBoardDto, @Req() req): Observable<Board> {
    input.email = req.user.email;
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }
}
