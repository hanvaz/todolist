import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề');
      return;
    }

    onAddTodo(title, description);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nhập tiêu đề công việc..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          className="form-input title-input"
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Mô tả (tùy chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input description-input"
          rows="2"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-btn">
        <i className="ti ti-plus"></i> Thêm công việc
      </button>
    </form>
  );
}

export default TodoForm;
