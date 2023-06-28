import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { UserGuard } from 'libs/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUsers')
  @UseGuards(UserGuard)
  getUsers(): Observable<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Post('/createUser')
  createUser(@Body() input: CreateUserDto): Observable<UserEntity> {
    return this.userService.createUser(input);
  }

  @Put('/updateUser')
  @UseGuards(UserGuard)
  updateUser(@Body() input: UpdateUserDto, @Req() req): Observable<UserEntity> {
    input.id = req.user.id;
    return this.userService.updateUser(input);
  }
}
