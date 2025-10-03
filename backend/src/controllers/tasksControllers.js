import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Lấy tất cả các task và sắp xếp theo thời gian tạo giảm dần
    res.status(200).json(tasks); // Trả về danh sách tất cả các task
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error }); // Xử lý lỗi
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body; // Lấy tiêu đề từ body của request
    const task = new Task({ title }); // Tạo một instance mới của Task với tiêu đề từ body
    const newTask = await task.save(); // Lưu task mới vào cơ sở dữ liệu
    res.status(201).json(newTask); // Trả về task mới tạo với mã trạng thái 201 (Created)
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error }); // Xử lý lỗi
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body; // Lấy dữ liệu từ body
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id, // Tìm task theo ID từ params
      { title, status, completedAt }, // Cập nhật các trường tương ứng
      { new: true } // Trả về document đã được cập nhật
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" }); // Kiểm tra nếu task không tồn tại
    }
    return res.status(200).json(updateTask); // Trả về task đã được cập nhật
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error }); // Xử lý lỗi
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Tìm và xóa task theo ID
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" }); // Kiểm tra nếu task không tồn tại
    }
    return res.status(200).json({ message: "Task deleted successfully" }); // Trả về thông báo thành công
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error }); // Xử lý lỗi
  }
};
