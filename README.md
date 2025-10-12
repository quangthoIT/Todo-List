# 📝 Todo List

---

Ứng dụng **Quản lý công việc cá nhân (Todo List)** giúp người dùng tạo, theo dõi, hoàn thành và xóa các nhiệm vụ hằng ngày.
Dự án được phát triển bằng **MERN Stack (MongoDB, ExpressJS, React, Node.js)** kết hợp với **TailwindCSS** để tạo giao diện hiện đại, thân thiện.

🔗 **Truy cập trực tiếp:** [https://todo-list-golt.onrender.com](https://todo-list-golt.onrender.com)

---

## 🧩 Tính năng chính

1. **Quản lý công việc**
   - Thêm, sửa, xóa công việc dễ dàng.
   - Đánh dấu hoàn thành hoặc chưa hoàn thành.
   - Đếm số lượng công việc đang hoạt động và đã hoàn thành.

2. **Bộ lọc và tìm kiếm**
   - Lọc công việc theo trạng thái: *Tất cả / Đang làm / Hoàn thành*.
   - Lọc theo thời gian: *Hôm nay / Tuần này / Tháng này*.
   - Giao diện responsive, tương thích với mọi thiết bị.

3. **Kết nối dữ liệu thực tế**
   - Lưu trữ và truy xuất công việc từ **MongoDB Atlas**.
   - Triển khai fullstack trên **Render**.

---

## 🛠️ Công nghệ sử dụng

| Layer | Công nghệ |
|--------|------------|
| **Frontend** | ReactJS, Vite, TailwindCSS, Lucide React |
| **Backend API** | Node.js (ExpressJS), Mongoose |
| **Cơ sở dữ liệu** | MongoDB Atlas |
| **Triển khai** | Render |
| **Khác** | Axios, dotenv, shadcn/ui |

---

## ⚙️ Cài đặt và chạy ứng dụng

### 1️⃣ Clone dự án
```bash
git clone https://github.com/quangthoIT/Todo-List.git
cd Todo-List
```

### 2️⃣ Cài đặt dependencies
```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3️⃣ Cấu hình môi trường
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

### 4️⃣ Chạy ứng dụng
```bash
npm run start --prefix backend
npm run dev --prefix frontend
```

---

#### 💬 “Làm việc thông minh hơn, không chỉ chăm chỉ hơn — bắt đầu từ việc quản lý công việc thật hiệu quả!” 🧠
