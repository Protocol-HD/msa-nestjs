import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisCacheService {
  getHello(): string {
    return 'Hello World!';
  }
}
