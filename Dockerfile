FROM node:18.15.0

WORKDIR /app

COPY package*.json /app
COPY dist/apps/microservice-name/. /app/
COPY .env.development /app/.env
COPY libs/prisma/* /app/libs/prisma/

RUN npm install
RUN npx prisma generate --schema ./libs/prisma/user-schema.prisma
RUN npx prisma generate --schema ./libs/prisma/board-schema.prisma

EXPOSE 3000

CMD ["node", "main.js"]