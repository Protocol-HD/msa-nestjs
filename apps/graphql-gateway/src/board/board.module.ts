import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOARD_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
