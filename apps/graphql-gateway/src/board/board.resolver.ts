import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { UserGuardGQL } from 'libs/auth/auth.guard';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Observable } from 'rxjs';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';

@Resolver()
export class BoardResolver {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.BOARD.name)
    private readonly boardClient: ClientProxy,
  ) {}

  @Query(() => [BoardDto], { name: 'boards' })
  getBoards(): Observable<BoardDto[]> {
    return this.boardClient.send({ cmd: 'getBoards' }, {});
  }

  @Mutation(() => BoardDto, { name: 'createBoard' })
  @UseGuards(UserGuardGQL)
  createBoard(
    @Args('input') input: CreateBoardDto,
    @Context() context,
  ): Observable<BoardDto> {
    input.email = context.req.user.email;
    return this.boardClient.send({ cmd: 'createBoard' }, input);
  }
}
