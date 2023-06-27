import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}

  getUser(): Observable<UserEntity> {
    return this.userClient.send({ cmd: 'user' }, '');
  }

  getBoard(): Observable<string> {
    return this.boardClient.send({ cmd: 'board' }, '');
  }
}
