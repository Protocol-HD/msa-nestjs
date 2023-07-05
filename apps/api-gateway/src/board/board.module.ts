import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { BoardController } from './board.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOARD_SERVICE',
        transport: MICROSERVICE_OPTIONS.BOARD.transport,
        options: MICROSERVICE_OPTIONS.BOARD.options,
      },
    ]),
  ],
  controllers: [BoardController],
})
export class BoardModule {}
