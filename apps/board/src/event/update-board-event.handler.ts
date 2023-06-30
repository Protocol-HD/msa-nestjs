import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PrismaService } from '../prisma.service';
import { UpdateBoardAuthorEvent } from './update-board-author.event';

@EventsHandler(UpdateBoardAuthorEvent)
export class UpdateBoardEventHandler
  implements IEventHandler<UpdateBoardAuthorEvent>
{
  constructor(private readonly prismaService: PrismaService) {}

  async handle(event: UpdateBoardAuthorEvent) {
    switch (event.name) {
      case UpdateBoardAuthorEvent.name:
        await this.prismaService.board.updateMany({
          where: { userId: event.userId },
          data: { author: event.author },
        });
        break;
      default:
        break;
    }
  }
}
