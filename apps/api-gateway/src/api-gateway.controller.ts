import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'apps/user/src/dto/create-user.dto';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.apiGatewayService.createUser(createUserDto);
  }
}
