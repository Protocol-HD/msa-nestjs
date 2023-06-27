import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from 'libs/entities/user.entity';
import { Observable } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('/getUser/:id')
  getHello(@Param('id') id: string): Observable<UserEntity> {
    return this.apiGatewayService.getUser(id);
  }

  @Post()
  getHello2(): Observable<string> {
    return this.apiGatewayService.getBoard();
  }
}
