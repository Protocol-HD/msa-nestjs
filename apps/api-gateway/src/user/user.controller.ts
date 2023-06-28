import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'apps/user/src/dto/create-user.dto';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { UserGuard } from 'libs/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/getUsers')
  @UseGuards(UserGuard)
  getUsers(): Observable<UserEntity[]> {
    return this.userService.getUsers();
  }
}
