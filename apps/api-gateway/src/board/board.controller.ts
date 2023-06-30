import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserGuard } from 'libs/auth/auth.guard';
import { Board } from 'prisma/generated/boardClient';
import { Observable } from 'rxjs';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/getBoards')
  getBoards(): Observable<Board[]> {
    return this.boardService.getBoards();
  }

  @Post('/createBoard')
  @UseGuards(UserGuard)
  createBoard(@Body() input: CreateBoardDto, @Req() req): Observable<Board> {
    input.email = req.user.email;
    return this.boardService.createBoard(input);
  }
}
