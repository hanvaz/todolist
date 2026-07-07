const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_db'
});

db.connect((err) => {
  if (err) {
    console.log('Kết nối thất bại');
    console.log(err);
    return;
  }

  console.log('Đã kết nối MySQL');
});

module.exports = db;