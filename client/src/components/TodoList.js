import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onUpdate, onDelete, editingId, setEditingId }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <div className="empty-state">
          <span className="empty-icon"><i className="ti ti-smile"></i></span>
          <p>Không có công việc nào!</p>
          <p className="empty-subtitle">Thêm một công việc mới để bắt đầu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isEditing={editingId === todo.id}
          setEditing={setEditingId}
        />
      ))}
    </div>
  );
}

export default TodoList;
