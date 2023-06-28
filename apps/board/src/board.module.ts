import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { CreateBoardCommandHandler } from './command/create-board-command.handler';
import { BoardEntity } from 'libs/entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

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
  providers: [CreateBoardCommandHandler],
})
export class BoardModule {}
