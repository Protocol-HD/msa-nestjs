import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Observable } from 'rxjs';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UserGuardGQL } from 'libs/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [BoardDto], { name: 'boards' })
  getBoards(): Observable<BoardDto[]> {
    return this.boardService.getBoards();
  }

  @Mutation(() => BoardDto, { name: 'createBoard' })
  @UseGuards(UserGuardGQL)
  createBoard(
    @Args('input') input: CreateBoardDto,
    @Context() context,
  ): Observable<BoardDto> {
    input.email = context.req.user.email;
    return this.boardService.createBoard(input);
  }
}
