import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (title, description) => {
    try {
      const response = await axios.post(API_BASE_URL, { title, description });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Lỗi khi thêm todo:', error);
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      setEditingId(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật todo:', error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa todo:', error);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id, completed) => {
    await handleUpdateTodo(id, { completed: !completed });
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1><i className="ti ti-notepad"></i> Todo List</h1>
          <p className="subtitle">Quản lý công việc hàng ngày</p>
        </header>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Tổng:</span>
            <span className="stat-value">{todos.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Hoàn thành:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Còn lại:</span>
            <span className="stat-value pending">{todos.length - completedCount}</span>
          </div>
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <TodoList
            todos={todos}
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
