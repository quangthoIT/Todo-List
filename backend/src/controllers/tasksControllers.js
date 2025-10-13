import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  // Tìm kiếm task theo filter hôm nay, tuần, tháng
  switch (filter) {
    case "today": {
      // Tìm kiếm task theo hôm nay
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      // Tìm kiếm task theo tuần này
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      break;
    }
    case "month": {
      // Tìm kiếm task theo tháng này
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    // Tìm kiếm task theo tất cả
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  // Truy vấn task theo filter đang làm / hoàn thành
  try {
    const results = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }], // Sắp xếp task theo thời gian tạo mới nhất
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }], // Đếm số task đang làm
          completedCount: [
            { $match: { status: "completed" } }, // Đếm số task hoàn thành
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = results[0].tasks; // Lấy danh sách task
    const activeCount = results[0].activeCount[0]?.count || 0; // Lấy số task đang làm
    const completedCount = results[0].completedCount[0]?.count || 0; // Lấy số task hoàn thành
    res.status(200).json({ tasks, activeCount, completedCount }); // Trả về dữ liệu với mã trạng thái 200 (OK)
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
