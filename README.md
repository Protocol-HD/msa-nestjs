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

## Server 실행
```
npm run start api-gateway
npm run start graphql-gateway
npm run start user
npm run start board
npm run start auth
```