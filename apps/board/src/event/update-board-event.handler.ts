import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { User } from 'libs/prisma/userClient';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { UpdateBoardAuthorEvent } from './update-board-author.event';

@EventsHandler(UpdateBoardAuthorEvent)
export class UpdateBoardEventHandler
  implements IEventHandler<UpdateBoardAuthorEvent>
{
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
  ) {}

  async handle(event: UpdateBoardAuthorEvent) {
    switch (event.name) {
      case UpdateBoardAuthorEvent.name:
        // Zero-Payload Event 예제로 사용하기 위해 전달받은 userId로 User 조회
        const observableData = this.userClient.send(
          { cmd: 'getUserById' },
          event.userId,
        );

        const user: User = await firstValueFrom(observableData);

        // User 조회 결과로 Board의 author를 업데이트
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
