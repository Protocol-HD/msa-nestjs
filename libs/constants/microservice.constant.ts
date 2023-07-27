import { Transport } from '@nestjs/microservices';

const isLocal = process.env.NODE_ENV === 'local';

export const GATEWAY_OPTIONS = {
  API_GATEWAY: {
    port: isLocal ? 3000 : 3000,
  },
  GRAPHQL_GATEWAY: {
    name: 'GRAPHQL_GATEWAY_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 4000 : 3000,
      host: isLocal ? 'localhost' : 'graphql-gateway',
    },
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
  OAUTH: {
    name: 'OAUTH_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3004 : 3000,
      host: isLocal ? 'localhost' : 'oauth',
    },
  },
  REDIS_CACHE: {
    name: 'REDIS_CACHE_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3005 : 3000,
      host: isLocal ? 'localhost' : 'redis-cache',
    },
  },
  CHAT: {
    name: 'CHAT_SERVICE',
    transport: Transport.TCP as number,
    options: {
      port: isLocal ? 3006 : 3000,
      host: isLocal ? 'localhost' : 'chat',
    },
  },
};
