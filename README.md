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
npx prisma db push --schema ./libs/prisma/user-schema.prisma
npx prisma db push --schema ./libs/prisma/board-schema.prisma
```
PrismaClient 파일 생성
```
npx prisma generate --schema ./libs/prisma/user-schema.prisma
npx prisma generate --schema ./libs/prisma/board-schema.prisma
```

## Server 실행
```
npm run start api-gateway
npm run start graphql-gateway
npm run start user
npm run start board
npm run start auth
```


## 파일 네이밍 규칙

## Redis 규칙
Redis에 데이터를 저장할 때
key 값은 예를들어 'REFRASH_TOKEN:test@email.com'과 같이
대문자로 이루어진 그룹명으로 구분