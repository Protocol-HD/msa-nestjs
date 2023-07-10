import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { BoardController } from './board.controller';
import { CreateBoardCommandHandler } from './command/create-board-command.handler';
import { UpdateBoardCommandHandler } from './command/update-board-command.handler';
import { UpdatedBoardEventHandler } from './event/updated-board-event.handler';
import { PrismaService } from './prisma.service';
import { GetBoardsQueryHandler } from './query/get-boards-query.handler';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.USER.name,
        transport: MICROSERVICE_OPTIONS.USER.transport,
        options: MICROSERVICE_OPTIONS.USER.options,
      },
    ]),
    CqrsModule,
  ],
  controllers: [BoardController],
  providers: [
    PrismaService,
    CreateBoardCommandHandler,
    GetBoardsQueryHandler,
    UpdateBoardCommandHandler,
    UpdatedBoardEventHandler,
  ],
})
export class BoardModule {}
