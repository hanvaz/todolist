import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api/todos';

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Lỗi khi tải todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (title, description) => {
    try {
      const response = await axios.post(API_BASE_URL, {
        title,
        description,
      });

      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Lỗi khi thêm todo:', error);
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updates);

      setTodos(
        todos.map((todo) => (todo.id === id ? response.data : todo))
      );

      setEditingId(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật todo:', error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa todo:', error);
    }
  };

  // Toggle complete
  const handleToggleTodo = async (id, completed) => {
    await handleUpdateTodo(id, {
      completed: !completed,
    });
  };

  // Search
  const filteredTodos = todos.filter((todo) => {
    const keyword = searchTerm.toLowerCase();

    return (
      todo.title.toLowerCase().includes(keyword) ||
      (todo.description &&
        todo.description.toLowerCase().includes(keyword))
    );
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>
            <i className=""></i>
            Todo List
          </h1>
          <p className="subtitle">
            Quản lý công việc hàng ngày
          </p>
        </header>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Tổng</span>
            <span className="stat-value">{todos.length}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Hoàn thành</span>
            <span className="stat-value completed">
              {completedCount}
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Còn lại</span>
            <span className="stat-value pending">
              {todos.length - completedCount}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <i className="ti ti-search"></i>

          <input
            type="text"
            placeholder="Tìm kiếm công việc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
      </div>
    </div>
  );
}

export default App;