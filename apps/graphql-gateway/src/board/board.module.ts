import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BoardResolver } from './board.resolver';

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
  providers: [BoardResolver],
})
export class BoardModule {}
