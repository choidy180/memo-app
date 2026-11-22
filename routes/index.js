const express = require('express');
const pool = require('../db');

const router = express.Router();

// 홈: DB에서 메모(작성자 이름 포함)와 회원 목록을 꺼내 화면에 넘긴다
router.get('/', async (req, res) => {
  const memoResult = await pool.query(
    `SELECT notes.id, notes.body, members.name
       FROM notes
       JOIN members ON notes.member_id = members.id
      ORDER BY notes.id DESC`
  );
  const memberResult = await pool.query(
    'SELECT id, name FROM members ORDER BY id'
  );

  res.render('index', {
    title: '나의 첫 메모장',
    memos: memoResult.rows,
    members: memberResult.rows,
  });
});

// 메모 추가: 폼 값을 받아 INSERT 한 뒤 목록으로 돌려보낸다
router.post('/memos', async (req, res) => {
  const memberId = Number(req.body.memberId);
  const body = (req.body.body || '').trim();

  if (body) {
    await pool.query(
      'INSERT INTO notes (member_id, body) VALUES ($1, $2)',
      [memberId, body]
    );
  }
  res.redirect('/');
});

// 메모 삭제: 주소의 번호에 해당하는 메모를 지운다
router.post('/memos/:id/delete', async (req, res) => {
  await pool.query('DELETE FROM notes WHERE id = $1', [Number(req.params.id)]);
  res.redirect('/');
});

router.get('/ping', (req, res) => {
  res.send('pong');
});

// 07장 연결 시험용
router.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, body FROM notes WHERE id = 10'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.code, err.message);
    res.status(500).send('DB 조회 오류');
  }
});

module.exports = router;
