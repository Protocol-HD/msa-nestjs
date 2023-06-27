import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
