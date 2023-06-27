import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { UserController } from './user.controller';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { CreateUserEventHandler } from './event/create-user-event.handler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [CreateUserCommandHandler, CreateUserEventHandler],
})
export class UserModule {}
