import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Observable } from 'rxjs';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): Observable<string> {
    return this.apiGatewayService.getUser();
  }

  @Post()
  getHello2(): Observable<string> {
    return this.apiGatewayService.getBoard();
  }
}
