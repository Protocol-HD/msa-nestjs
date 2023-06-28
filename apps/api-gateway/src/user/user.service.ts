import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  getUsers(): Observable<UserEntity[]> {
    return this.userClient.send({ cmd: 'getUsers' }, {});
  }

  createUser(input: CreateUserDto): Observable<UserEntity> {
    return this.userClient.send({ cmd: 'createUser' }, input);
  }

  updateUser(input: UpdateUserDto): Observable<UserEntity> {
    return this.userClient.send({ cmd: 'updateUser' }, input);
  }
}
