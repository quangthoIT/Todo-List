// npm install nodemon -D (dev dependency)
import express from "express"; // npm install express
import taskRouter from "./routes/tasksRouters.js";
import dotenv from "dotenv"; // npm install dotenv
import { connectDB } from "./config/db.js";

dotenv.config(); // Đọc file .env

connectDB(); // Kết nối đến database

const PORT = process.env.PORT || 5001; // Đọc biến PORT tạo trong file .env hoặc 5001

const app = express(); // Khởi tạo express

app.use("/api/task", taskRouter); // Khởi tạo router

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
