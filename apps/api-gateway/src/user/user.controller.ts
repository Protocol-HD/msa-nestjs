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
import { UserGuard } from 'libs/auth/auth.guard';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { User } from 'libs/prisma/userClient';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
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
