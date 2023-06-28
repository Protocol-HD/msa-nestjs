import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { UserController } from './user.controller';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { CreateUserEventHandler } from './event/create-user-event.handler';
import { GetUsersQueryHandler } from './query/get-users-query.handler';
import { GetUserQueryHandler } from './query/get-user-query.handler';

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
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserCommandHandler,
    CreateUserEventHandler,
    GetUsersQueryHandler,
    GetUserQueryHandler,
  ],
})
export class UserModule {}
