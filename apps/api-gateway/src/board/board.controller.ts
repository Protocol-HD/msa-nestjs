import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { Observable } from 'rxjs';
import { BoardEntity } from 'libs/entities/board.entity';
import { UserGuard } from 'libs/auth/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/getBoards')
  getBoards(): Observable<BoardEntity[]> {
    return this.boardService.getBoards();
  }

  @Post('/createBoard')
  @UseGuards(UserGuard)
  createBoard(
    @Body() input: CreateBoardDto,
    @Req() req,
  ): Observable<BoardEntity> {
    input.email = req.user.email;
    return this.boardService.createBoard(input);
  }
}
