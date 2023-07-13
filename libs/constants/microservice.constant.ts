import { Transport } from '@nestjs/microservices';

const isLocal = process.env.NODE_ENV === 'local';

export const GATEWAY_OPTIONS = {
  API_GATEWAY: {
    port: isLocal ? 3000 : 3000,
  },
  GRAPHQL_GATEWAY: {
    port: isLocal ? 4000 : 3000,
  },
};

export const MICROSERVICE_OPTIONS = {
  USER: {
    name: 'USER_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3001 : 3000,
      host: isLocal ? 'localhost' : 'user',
    },
  },
  BOARD: {
    name: 'BOARD_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3002 : 3000,
      host: isLocal ? 'localhost' : 'board',
    },
  },
  AUTH: {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3003 : 3000,
      host: isLocal ? 'localhost' : 'auth',
    },
  },
  REDIS_CACHE: {
    name: 'REDIS_CACHE_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3004 : 3000,
      host: isLocal ? 'localhost' : 'redis-cache',
    },
  },
};
