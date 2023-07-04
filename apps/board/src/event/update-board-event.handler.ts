import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PrismaService } from '../prisma.service';
import { UpdateBoardAuthorEvent } from './update-board-author.event';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { User } from '@prisma/userClient';

@EventsHandler(UpdateBoardAuthorEvent)
export class UpdateBoardEventHandler
  implements IEventHandler<UpdateBoardAuthorEvent>
{
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async handle(event: UpdateBoardAuthorEvent) {
    switch (event.name) {
      case UpdateBoardAuthorEvent.name:
        const observableData = this.userClient.send(
          { cmd: 'getUserById' },
          event.userId,
        );

        const user: User = await firstValueFrom(observableData);

        await this.prismaService.board.updateMany({
          where: { userId: event.userId },
          data: { author: user.name },
        });
        break;
      default:
        break;
    }
  }
}
