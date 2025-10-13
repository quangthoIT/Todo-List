import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasksControllers.js";

const router = express.Router(); // Khởi tạo router

router.get("/", getAllTasks); // Lấy tất cả task

router.post("/", createTask); // Tạo task

router.put("/:id", updateTask); // Cập nhật task

router.delete("/:id", deleteTask); // Xóa task

export default router;
