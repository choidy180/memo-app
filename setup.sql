-- Node.js 시작하기 (PostgreSQL 판) · 05~07장에서 실행한 SQL 모음
-- pgAdmin 4 Query Tool에서 실행합니다. 어느 탭에서 실행하는지(탭 제목)가 중요합니다.

-- ─────────────────────────────────────────────
-- ① 탭: postgres/postgres@내 컴퓨터
--    이 문장은 다른 문장과 함께 실행하면 안 됩니다. 이 줄만 골라 실행합니다.
-- ─────────────────────────────────────────────
CREATE DATABASE memo_app;


-- ─────────────────────────────────────────────
-- ② 탭: memo_app/postgres@내 컴퓨터  (memo_app을 고르고 Query Tool을 새로 엽니다)
-- ─────────────────────────────────────────────

-- 06장 · 회원 표
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

INSERT INTO members (id, name)
VALUES (1, '오정민'), (2, '김민석');

-- 06장 · 메모 표 (번호는 10부터 자동)
CREATE TABLE notes (
  id INTEGER
    GENERATED ALWAYS AS IDENTITY (START WITH 10)
    PRIMARY KEY,
  member_id INTEGER NOT NULL,
  body VARCHAR(100) NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id)
);

INSERT INTO notes (member_id, body)
VALUES (1, '첫 메모'), (1, '다음 메모');

-- 07장 · Node.js 전용 계정 (비밀번호는 .env의 DB_PASSWORD와 같게)
CREATE USER app_user WITH PASSWORD '여기에_내_비밀번호';
GRANT CONNECT ON DATABASE memo_app TO app_user;
GRANT SELECT, INSERT ON members, notes TO app_user;

-- 확인
SELECT notes.body, members.name
FROM notes
JOIN members ON notes.member_id = members.id
ORDER BY notes.id;
