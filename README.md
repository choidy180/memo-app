# memo-app (PostgreSQL 판 완성 코드)

교육 자료 「Node.js 시작하기 · PostgreSQL 판」을 끝까지 따라 했을 때의 완성본입니다.
막히면 내 파일과 한 줄씩 비교해 봅니다.

## 실행 순서

1. PostgreSQL과 pgAdmin 4를 설치합니다(자료 05장).
2. pgAdmin 4에서 `setup.sql`을 주석의 안내대로 실행합니다(05~07장).
3. `.env.example`을 복사해 `.env`를 만들고 `DB_PASSWORD`를 app_user 비밀번호로 바꿉니다.
4. 터미널에서 이 폴더로 이동해 실행합니다.

```
npm install
node check-db.js
npm run dev
```

5. 브라우저에서 http://localhost:3000 을 엽니다.
