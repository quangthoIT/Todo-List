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
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0);

  const [completedTaskCount, setcompletedTaskCount] = useState(0);

  const [filter, setFilter] = useState("all");

  const [dateQuery, setDateQuery] = useState("today");

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Hàm để lấy tasks
  const fetchTasks = async () => {
    try {
      // Gọi api truy xuất tasks
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      // Sử dụng setTaskBuffer để cập nhật danh sách tasks
      setTaskBuffer(res.data.tasks);
      // Sử dụng setActiveTaskCount để cập nhật số task active
      setActiveTaskCount(res.data.activeCount);
      // Sử dụng setcompletedTaskCount để cập nhật số task hoàn thành
      setcompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  // Hàm để lấy task theo filter
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      // Nếu filter là active thì task.status phải là active
      case "active":
        return task.status === "active";
      // Nếu filter là completed thì task.status phải là completed
      case "completed":
        return task.status === "completed";
      // Nếu filter là all thì task.status phải là active và completed
      default:
        return true;
    }
  });

  // Hàm để lấy task theo page Next
  const handleNext = () => {
    // Nếu page < totalPage thì page + 1
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Hàm để lấy task theo page Prev
  const handlePrev = () => {
    // Nếu page > 1 thì page - 1
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Hàm để lấy task theo page
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // Nếu không có task page sau thì lấy task trên page trước đó
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  // Tính toán số trang
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  // Hàm để cập nhật page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Hàm để lấy task theo filter
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
              filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChange={handleTaskChanged}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mx-5 sm:mx-0">
              {/* Phân trang */}
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              {/* Thống kê ngày */}
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>
            {/* Chân trang */}
            <div className="pb-3">
              <Footer
                activeTasksCount={activeTaskCount}
                completedTasksCount={completedTaskCount}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default HomePage;
