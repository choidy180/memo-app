const express = require('express');
const router = require('./routes');

const app = express();

app.set('view engine', 'ejs'); // views 폴더의 .ejs 파일로 화면을 만든다
app.use(express.static('public')); // public 폴더의 파일(CSS 등)을 그대로 보낸다
app.use(express.urlencoded({ extended: false })); // 폼으로 보낸 값을 req.body에 담는다
app.use('/', router);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
