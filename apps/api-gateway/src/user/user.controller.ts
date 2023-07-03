import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'libs/auth/auth.guard';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/userClient';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUsers')
  @UseGuards(UserGuard)
  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }

  @Post('/createUser')
  createUser(@Body() input: CreateUserDto): Observable<User> {
    return this.userService.createUser(input);
  }

  @Put('/updateUser')
  @UseGuards(UserGuard)
  updateUser(@Body() input: UpdateUserDto, @Req() req): Observable<User> {
    input.id = req.user.id;
    return this.userService.updateUser(input);
  }
}
