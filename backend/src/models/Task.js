import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Kiểu dữ liệu là chuỗi
      required: true, // Bắt buộc
      trim: true, // Loại bỏ khoảng trắng
    },
    status: {
      type: String, // Kiểu dữ liệu là chuỗi
      enum: ["pending", "active", "complete"], // Danh sách các trạng thái
      default: "pending", // Mặc định là "pending"
    },
    completedAt: {
      type: Date, // Ngày hoàn thành
      default: null, // Mặc định là null
    },
  },
  { timestamps: true } // Thêm timestamp createdAt và updatedAt
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
