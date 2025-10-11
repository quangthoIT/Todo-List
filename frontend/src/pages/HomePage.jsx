import React, { useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0);

  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  // Hàm để lấy task theo filter
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleTaskChanged = () => {
    fetchTasks();
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Soft Morning Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(135deg,
        rgba(250,252,255,1) 0%,
        rgba(225,235,255,0.7) 30%,
        rgba(200,215,255,0.45) 60%,
        rgba(185,200,255,0.5) 100%
      ),
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(215,225,255,0.3) 0%, transparent 55%),
      radial-gradient(circle at 40% 85%, rgba(220,230,255,0.25) 0%, transparent 60%)
    `,
        }}
      />
      {
        /* Your Content/Components */
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Đầu trang */}
            <Header />
            {/* Tạo task */}
            <AddTask
              handleTaskChanged={handleTaskChanged}
              handleTaskChange={fetchTasks}
            />
            {/* Thống kê và Bộ lọc */}
            <StartAndFilters
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTaskCount}
              completedTasksCount={completedTaskCount}
            />
            {/* Danh sách task */}
            <TaskList
              filteredTasks={filteredTasks}
              filter={filter}
              handleTaskChange={handleTaskChanged}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Phân trang */}
              <TaskListPagination />
              {/* Thống kê ngày */}
              <DateTimeFilter />
            </div>
            {/* Chân trang */}
            <Footer
              activeTasksCount={activeTaskCount}
              completedTasksCount={completedTaskCount}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default HomePage;
