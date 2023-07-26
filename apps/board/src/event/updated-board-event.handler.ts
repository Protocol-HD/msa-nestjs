import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { User } from 'libs/prisma/userClient';
import { firstValueFrom } from 'rxjs';
import { BoardRepository } from '../repository/board.repository';
import { UpdatedBoardAuthorEvent } from './updated-board-author.event';

@EventsHandler(UpdatedBoardAuthorEvent)
export class UpdatedBoardEventHandler
  implements IEventHandler<UpdatedBoardAuthorEvent>
{
  constructor(
    private readonly boardRepository: BoardRepository,
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
  ) {}

  async handle(event: UpdatedBoardAuthorEvent) {
    switch (event.name) {
      case UpdatedBoardAuthorEvent.name:
        // Zero-Payload Event 예제로 사용하기 위해 전달받은 userId로 User 조회
        const observableData = this.userClient.send(
          { cmd: 'getUserById' },
          event.userId,
        );

        const user: User = await firstValueFrom(observableData);

        // User 조회 결과로 Board의 author를 업데이트
        await this.boardRepository.updateAllBy({
          where: { userId: event.userId },
          data: { author: user.name },
        });
        break;
      default:
        break;
    }
  }
}
