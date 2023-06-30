import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BoardController } from './board.controller';
import { CreateBoardCommandHandler } from './command/create-board-command.handler';
import { UpdateBoardCommandHandler } from './command/update-board-command.handler';
import { UpdateBoardEventHandler } from './event/update-board-event.handler';
import { PrismaService } from './prisma.service';
import { GetBoardsQueryHandler } from './query/get-boards-query.handler';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
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
    UpdateBoardEventHandler,
  ],
})
export class BoardModule {}
