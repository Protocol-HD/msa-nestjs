import { Transport } from '@nestjs/microservices';

const isLocal = process.env.NODE_ENV === 'local';

export const MICROSERVICE_OPTIONS = {
  API_GATEWAY: {
    transport: Transport.TCP as number,
    options: {
      port: 3000,
      host: isLocal ? 'localhost' : 'api-gateway',
    },
  },
  USER: {
    transport: Transport.TCP as number,
    options: {
      port: 3001,
      host: isLocal ? 'localhost' : 'user',
    },
  },
  BOARD: {
    transport: Transport.TCP as number,
    options: {
      port: 3002,
      host: isLocal ? 'localhost' : 'board',
    },
  },
  AUTH: {
    transport: Transport.TCP as number,
    options: {
      port: 3003,
      host: isLocal ? 'localhost' : 'auth',
    },
  },
  REDIS_CACHE: {
    transport: Transport.TCP as number,
    options: {
      port: 3004,
      host: isLocal ? 'localhost' : 'redis-cache',
    },
  },
  GRAPHQL_GATEWAY: {
    transport: Transport.TCP as number,
    options: {
      port: 4000,
      host: isLocal ? 'localhost' : 'graphql-gateway',
    },
  },
};
