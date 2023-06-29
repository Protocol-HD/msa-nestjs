import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  getUsers(): Observable<UserDto[]> {
    return this.userClient.send({ cmd: 'getUsers' }, {});
  }

  createUser(input: CreateUserDto): Observable<UserDto> {
    return this.userClient.send({ cmd: 'createUser' }, input);
  }

  updateUser(input: UpdateUserDto): Observable<UserDto> {
    return this.userClient.send({ cmd: 'updateUser' }, input);
  }
}
