const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/todos', (req, res) => {
  db.query(
    'SELECT * FROM todos ORDER BY created_at DESC',
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Lỗi server'
        });
      }

      res.json(results);
    }
  );
});

app.get('/api/todos/:id', (req, res) => {

  db.query(
    'SELECT * FROM todos WHERE id=?',
    [req.params.id],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          message: 'Lỗi server'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: 'Todo không tìm thấy'
        });
      }

      res.json(results[0]);

    }
  );

});

app.post('/api/todos', (req, res) => {

  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      message: 'Tiêu đề không được để trống'
    });
  }

  db.query(
    'INSERT INTO todos(title, description, completed) VALUES (?, ?, ?)',
    [
      title,
      description || '',
      false
    ],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Không thể thêm công việc'
        });
      }

      db.query(
        'SELECT * FROM todos WHERE id=?',
        [result.insertId],
        (err, rows) => {

          if (err) {
            return res.status(500).json({
              message: 'Lỗi server'
            });
          }

          res.status(201).json(rows[0]);

        }
      );

    }
  );

});

app.put('/api/todos/:id', (req, res) => {

  const { title, description, completed } = req.body;

  db.query(
    `UPDATE todos
     SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        completed = COALESCE(?, completed)
     WHERE id=?`,
    [
      title,
      description,
      completed,
      req.params.id
    ],
    (err) => {

      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Không thể cập nhật'
        });
      }

      db.query(
        'SELECT * FROM todos WHERE id=?',
        [req.params.id],
        (err, rows) => {

          if (rows.length === 0) {
            return res.status(404).json({
              message: 'Todo không tồn tại'
            });
          }

          res.json(rows[0]);

        }
      );

    }
  );

});

app.delete('/api/todos/:id', (req, res) => {

  db.query(
    'DELETE FROM todos WHERE id=?',
    [req.params.id],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Không thể xóa'
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Todo không tồn tại'
        });
      }

      res.json({
        message: 'Xóa thành công'
      });

    }
  );

});

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    message: 'Lỗi server'
  });

});

app.listen(PORT, () => {

  console.log(`Server đang chạy tại http://localhost:${PORT}`);

});