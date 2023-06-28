import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { Observable } from 'rxjs';
import { CreateBoardDto } from 'apps/board/src/dto/create-board.dto';
import { BoardEntity } from 'libs/entities/board.entity';
import { UserGuard } from 'libs/auth/auth.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

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
