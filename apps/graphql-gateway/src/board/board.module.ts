import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { BoardResolver } from './board.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.BOARD.name,
        transport: MICROSERVICE_OPTIONS.BOARD.transport,
        options: MICROSERVICE_OPTIONS.BOARD.options,
      },
    ]),
  ],
  providers: [BoardResolver],
})
export class BoardModule {}
