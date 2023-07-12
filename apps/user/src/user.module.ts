import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { UpdateUserCommandHandler } from './command/update-user-command.handler';
import { CreatedUserEventHandler } from './event/created-user-event.handler';
import { UpdatedUserEventHandler } from './event/updated-user-event.handler';
import { PrismaService } from './repository/prisma.service';
import { GetUserByIdQueryHandler } from './query/get-user-by-id-query.handler';
import { GetUserQueryHandler } from './query/get-user-query.handler';
import { GetUsersQueryHandler } from './query/get-users-query.handler';
import { UserRepository } from './repository/user.repository';
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
    UserRepository,
    CreateUserCommandHandler,
    CreatedUserEventHandler,
    GetUsersQueryHandler,
    GetUserQueryHandler,
    GetUserByIdQueryHandler,
    UpdateUserCommandHandler,
    UpdatedUserEventHandler,
  ],
})
export class UserModule {}
