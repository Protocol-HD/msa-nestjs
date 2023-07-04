# MSA Nestjs Architecture

## Install
```
npm install
```

---
## env 셋팅
```
cp .env.example .env
```
복사한 .env파일의 Database url수정

---
## Prisma 셋팅
* 최초 실행 시, Db에 스키마 생성
```
npx prisma db push --schema ./libs/prisma/user-schema.prisma
npx prisma db push --schema ./libs/prisma/board-schema.prisma
```
* PrismaClient 파일 생성
```
npx prisma generate --schema ./libs/prisma/user-schema.prisma
npx prisma generate --schema ./libs/prisma/board-schema.prisma
```

---
## Server 실행
```
npm run start api-gateway
npm run start graphql-gateway
npm run start user
npm run start board
npm run start auth
npm run start redis-cache
```

---
## 파일 네이밍 규칙
* 폴더명, 파일명 모두 소문자만 사용
```
api-gateway/src/api-gateway.module.ts
```
* 파일명에는 대략적인 기능을 유추할 수 있는 이름 + 분류 + .ts로 작성
```
update-user.command.ts
update-user-command.handler.ts
update-board-event.handler.ts
update-board-author.event.ts
```

---
## Cqrs 패턴 적용 유의점
* Command, Query는 핸들러 하나당 하나의 기능을 담당, 즉 기능이 추가되면 새로운 파일을 추가 작성해야함
* Event는 하나의 핸들러에 여러 이벤트를 핸들링 할 수 있음, switch 문으로 어떤 이벤트인지 구분 (확정 못함, 논의 필요)
* 이벤트 전달시 Zero-Payload 룰 적용 (왠만하면 id 정도만 넘기기로, update-user-event.handler.ts에 예가 있음)

---
## Redis 규칙
* Redis에 데이터를 저장할 때 key 값은 예를들어 'REFRESH_TOKEN:test@email.com'과 같이 대문자로 이루어진 그룹명으로 구분