import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { UpdateUserCommandHandler } from './command/update-user-command.handler';
import { CreateUserEventHandler } from './event/create-user-event.handler';
import { GetUserQueryHandler } from './query/get-user-query.handler';
import { GetUsersQueryHandler } from './query/get-users-query.handler';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UpdateUserEventHandler } from './event/update-user-event.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gudehd',
      database: 'test_user',
      synchronize: true,
      logging: true,
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: 'BOARD_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserCommandHandler,
    CreateUserEventHandler,
    GetUsersQueryHandler,
    GetUserQueryHandler,
    UpdateUserCommandHandler,
    UpdateUserEventHandler,
  ],
})
export class UserModule {}
