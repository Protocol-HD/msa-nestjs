import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisCacheController } from './redis-cache.controller';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
          },
          password: config.get<string>('REDIS_PASSWORD'),
          ttl: 60, // 60 seconds
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
