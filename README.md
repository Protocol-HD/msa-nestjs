# MSA Nestjs Architecture

## Install
```
npm install
```

## env 셋팅
```
cp .env.example .env
```
복사한 .env파일의 Database url수정

## Prisma 셋팅
최초 실행 시, Db에 스키마 생성
```
npx prisma db push --schema ./prisma/user-schema.prisma
npx prisma db push --schema ./prisma/board-schema.prisma
```
PrismaClient 파일 생성
```
npx prisma generate --schema ./prisma/user-schema.prisma
npx prisma generate --schema ./prisma/board-schema.prisma
```

## Server 실행
```
npm run start api-gateway
npm run start graphql-gateway
npm run start user
npm run start board
npm run start auth
```