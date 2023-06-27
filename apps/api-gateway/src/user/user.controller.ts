import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'apps/user/src/dto/create-user.dto';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/getUsers')
  getUsers(): Observable<UserEntity[]> {
    return this.userService.getUsers();
  }
}
