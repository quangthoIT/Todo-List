// npm install nodemon -D (dev dependency)
import express from "express"; // npm install express
import taskRouter from "./routes/tasksRouters.js";
import dotenv from "dotenv"; // npm install dotenv
import { connectDB } from "./config/db.js";

dotenv.config(); // Đọc file .env

const PORT = process.env.PORT || 5001; // Đọc biến PORT tạo trong file .env hoặc 5001

const app = express(); // Khởi tạo express

app.use(express.json()); // Khóa xây dựng JSON

app.use("/api/tasks", taskRouter); // Khởi tạo router

// Kết nối với cơ sở dữ liệu trước khi chạy server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
