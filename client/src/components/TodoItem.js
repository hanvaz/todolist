import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onUpdate, onDelete, isEditing, setEditing }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleEdit = () => {
    setEditing(todo.id);
  };

  const handleSave = () => {
    if (title.trim()) {
      onUpdate(todo.id, { title, description });
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditing(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-input"
            placeholder="Tiêu đề"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Mô tả"
            rows="2"
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="btn-save">
              <i className="ti ti-check"></i> Lưu
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              <i className="ti ti-close"></i> Hủy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
            className="checkbox-input"
          />
          <span className="checkbox-custom"></span>
        </label>
        
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={handleEdit}
          className="btn-action btn-edit"
          title="Chỉnh sửa"
        >
          <i className="ti ti-pencil"></i>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-action btn-delete"
          title="Xóa"
        >
          <i className="ti ti-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
