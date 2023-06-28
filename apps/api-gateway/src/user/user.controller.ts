import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { UserGuard } from 'libs/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  createUser(@Body() input: CreateUserDto): Observable<UserEntity> {
    return this.userService.createUser(input);
  }

  @Get('/getUsers')
  @UseGuards(UserGuard)
  getUsers(): Observable<UserEntity[]> {
    return this.userService.getUsers();
  }
}
