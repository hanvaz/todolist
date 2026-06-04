const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let todos = [
  { id: uuidv4(), title: 'Học React', description: 'Học các khái niệm cơ bản', completed: false, createdAt: new Date() },
  { id: uuidv4(), title: 'Xây dựng Todo App', description: 'Tạo ứng dụng Todo hoàn chỉnh', completed: false, createdAt: new Date() }
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo không tìm thấy' });
  }
  res.json(todo);
});

// CREATE new todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Tiêu đề không được để trống' });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE todo
app.put('/api/todos/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const todo = todos.find(t => t.id === req.params.id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo không tìm thấy' });
  }

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo không tìm thấy' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Lỗi server' });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
