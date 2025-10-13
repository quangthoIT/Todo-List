// npm install nodemon -D (dev dependency)
import express from "express"; // npm install express
import taskRouter from "./routes/tasksRouters.js";
import dotenv from "dotenv"; // npm install dotenv
import { connectDB } from "./config/db.js";
import cors from "cors"; // npm install cors
import path from "path";

dotenv.config(); // Đọc file .env

const PORT = process.env.PORT || 5001; // Đọc biến PORT tạo trong file .env hoặc 5001

const __dirname = path.resolve(); // Là thư mục hành chính

const app = express(); // Khởi tạo express

app.use(express.json()); // Khóa xây dựng JSON

// Nếu chạy trong mô hình production thì khóa xây dựng CORS
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "http://localhost:5173" })); // Khóa xây dựng CORS
}

app.use("/api/tasks", taskRouter); // Khởi tạo router

// Nếu chạy trong mô hình production thì khóa xây dựng tài liệu tại thư mục frontend/dist
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Khóa xây dựng tài liệu tại thư mục frontend/dist

  app.get(
    "*",
    (req, res) =>
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) // Khóa xây dựng tài liệu tại thư mục frontend/dist/index.html
  );
}

// Kết nối với cơ sở dữ liệu trước khi chạy server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
