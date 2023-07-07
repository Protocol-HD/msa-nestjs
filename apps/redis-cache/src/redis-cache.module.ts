import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { redisStore } from 'cache-manager-redis-store';
import { DelRedisCommandHandler } from './command/del-redis-command.handler';
import { SetRedisCommandHandler } from './command/set-redis-command.handler';
import { GetRedisQueryHandler } from './query/get-redis-query.handler';
import { RedisCacheController } from './redis-cache.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
          password: process.env.REDIS_PASSWORD,
        });
        return {
          store: store as unknown as CacheStore,
          ttl: 60,
        };
      },
    }),
    CqrsModule,
  ],
  controllers: [RedisCacheController],
  providers: [
    GetRedisQueryHandler,
    SetRedisCommandHandler,
    DelRedisCommandHandler,
  ],
})
export class RedisCacheModule {}
