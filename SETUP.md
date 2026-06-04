# Todo List CRUD - Setup Guide

Hướng dẫn nhanh để chạy ứng dụng Todo List CRUD

## ⚡ Quick Start

### Bước 1: Cài đặt Backend
```bash
cd server
npm install
npm start
```
Backend sẽ chạy tại: http://localhost:5000

### Bước 2: Cài đặt Frontend (terminal khác)
```bash
cd client
npm install
npm start
```
Frontend sẽ mở tại: http://localhost:3000

## 📦 Dependencies

### Server
- `express` - Web framework
- `cors` - Cross-origin requests
- `uuid` - Tạo unique IDs

### Client
- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client
- `react-scripts` - Build scripts

## 🎯 Chức năng CRUD

- ✅ **Create**: Thêm công việc mới từ form
- ✅ **Read**: Hiển thị danh sách công việc
- ✅ **Update**: Chỉnh sửa tiêu đề, mô tả, trạng thái hoàn thành
- ✅ **Delete**: Xóa công việc

## 🔧 Development

### Sử dụng Nodemon (tự động reload)
```bash
cd server
npm run dev
```

### Build cho production
```bash
cd client
npm run build
```

## 📝 Cấu trúc Component

- **App.js** - Main component quản lý state
- **TodoForm.js** - Form để thêm todo
- **TodoList.js** - Danh sách todos
- **TodoItem.js** - Từng todo item với edit/delete

## 🎨 Styling

- CSS Grid cho layout stats
- Gradient background
- Smooth animations
- Responsive design

## 💾 Data Persistence

Hiện tại dữ liệu lưu trong memory. Để persist data:

1. Thêm database (MongoDB, PostgreSQL, etc.)
2. Thêm file storage (JSON file)
3. Thêm Local Storage (frontend only)

Ví dụ thêm file storage:
```javascript
// Thay in-memory array bằng file operations
const fs = require('fs').promises;
const FILE_PATH = './todos.json';
```

---

**Happy Coding! 🚀**
