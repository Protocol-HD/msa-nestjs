import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { UpdateUserCommandHandler } from './command/update-user-command.handler';
import { CreateUserEventHandler } from './event/create-user-event.handler';
import { UpdateUserEventHandler } from './event/update-user-event.handler';
import { GetUserQueryHandler } from './query/get-user-query.handler';
import { GetUsersQueryHandler } from './query/get-users-query.handler';
import { UserController } from './user.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
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
    PrismaService,
    CreateUserCommandHandler,
    CreateUserEventHandler,
    GetUsersQueryHandler,
    GetUserQueryHandler,
    UpdateUserCommandHandler,
    UpdateUserEventHandler,
  ],
})
export class UserModule {}
