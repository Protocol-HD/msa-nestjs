import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  createUser(input: CreateUserDto): Observable<UserEntity> {
    return this.userClient.send({ cmd: 'createUser' }, input);
  }

  getUsers(): Observable<UserEntity[]> {
    return this.userClient.send({ cmd: 'getUsers' }, {});
  }
}
