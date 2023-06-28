import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'libs/entities/board.entity';
import { BoardController } from './board.controller';
import { CreateBoardCommandHandler } from './command/create-board-command.handler';
import { UpdateBoardCommandHandler } from './command/update-board-command.handler';
import { UpdateBoardEventHandler } from './event/update-board-event.handler';
import { GetBoardsQueryHandler } from './query/get-boards-query.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gudehd',
      database: 'test_board',
      synchronize: true,
      logging: true,
      entities: [BoardEntity],
    }),
    TypeOrmModule.forFeature([BoardEntity]),
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
    CreateBoardCommandHandler,
    GetBoardsQueryHandler,
    UpdateBoardCommandHandler,
    UpdateBoardEventHandler,
  ],
})
export class BoardModule {}
