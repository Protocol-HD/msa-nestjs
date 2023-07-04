import { Controller, Get } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

@Controller()
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @Get()
  getHello(): string {
    return this.redisCacheService.getHello();
  }
}
