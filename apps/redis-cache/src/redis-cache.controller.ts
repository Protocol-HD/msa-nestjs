import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { RedisCacheService } from './redis-cache.service';

@Controller()
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @MessagePattern({ cmd: 'getRedis' })
  async getRedis(key: string) {
    return await this.redisCacheService.get(key);
  }

  @MessagePattern({ cmd: 'setRedis' })
  async setRedis(key: string, value: any) {
    await this.redisCacheService.set(key, value);
  }

  @EventPattern({ cmd: 'setRedis' })
  async setRedisEvent(key: string, value: any) {
    await this.redisCacheService.set(key, value);
  }

  @MessagePattern({ cmd: 'delRedis' })
  async delRedis(key: string) {
    await this.redisCacheService.del(key);
  }

  @EventPattern({ cmd: 'delRedis' })
  async delRedisEvent(key: string) {
    await this.redisCacheService.del(key);
  }
}
