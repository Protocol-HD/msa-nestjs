import { Transport } from '@nestjs/microservices';

const isLocal = process.env.NODE_ENV === 'local';

export const MICROSERVICE_OPTIONS = {
  API_GATEWAY: {
    name: 'API_GATEWAY_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 3000,
      host: isLocal ? 'localhost' : 'api-gateway',
    },
  },
  USER: {
    name: 'USER_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 3001,
      host: isLocal ? 'localhost' : 'user',
    },
  },
  BOARD: {
    name: 'BOARD_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 3002,
      host: isLocal ? 'localhost' : 'board',
    },
  },
  AUTH: {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 3003,
      host: isLocal ? 'localhost' : 'auth',
    },
  },
  REDIS_CACHE: {
    name: 'REDIS_CACHE_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 3004,
      host: isLocal ? 'localhost' : 'redis-cache',
    },
  },
  GRAPHQL_GATEWAY: {
    name: 'GRAPHQL_GATEWAY_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: 4000,
      host: isLocal ? 'localhost' : 'graphql-gateway',
    },
  },
};
