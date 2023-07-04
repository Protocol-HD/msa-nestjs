import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'libs/prisma/userClient';
import { UserGuard } from 'libs/auth/auth.guard';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Get('/getUsers')
  @UseGuards(UserGuard)
  getUsers(): Observable<User[]> {
    return this.userClient.send({ cmd: 'getUsers' }, {});
  }

  @Post('/createUser')
  createUser(@Body() input: CreateUserDto): Observable<User> {
    return this.userClient.send({ cmd: 'createUser' }, input);
  }

  @Put('/updateUser')
  @UseGuards(UserGuard)
  updateUser(@Body() input: UpdateUserDto, @Req() req): Observable<User> {
    input.id = req.user.id;
    return this.userClient.send({ cmd: 'updateUser' }, input);
  }
}
