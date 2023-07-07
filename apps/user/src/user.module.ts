import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { UpdateUserCommandHandler } from './command/update-user-command.handler';
import { CreateUserEventHandler } from './event/create-user-event.handler';
import { UpdateUserEventHandler } from './event/update-user-event.handler';
import { PrismaService } from './prisma.service';
import { GetUserByIdQueryHandler } from './query/get-user-by-id-query.handler';
import { GetUserQueryHandler } from './query/get-user-query.handler';
import { GetUsersQueryHandler } from './query/get-users-query.handler';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.BOARD.name,
        transport: MICROSERVICE_OPTIONS.BOARD.transport,
        options: MICROSERVICE_OPTIONS.BOARD.options,
      },
    ]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserCommandHandler,
    CreateUserEventHandler,
    GetUsersQueryHandler,
    GetUserQueryHandler,
    GetUserByIdQueryHandler,
    UpdateUserCommandHandler,
    UpdateUserEventHandler,
  ],
})
export class UserModule {}
