import React, { useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { toast } from "sonner";
import axios from "axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");
      setTaskBuffer(res.data);
      console.log(res.data);
      toast.success("Truy xuất tasks thành công.");
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
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
            <AddTask />
            {/* Thống kê và Bộ lọc */}
            <StartAndFilters />
            {/* Danh sách task */}
            <TaskList />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Phân trang */}
              <TaskListPagination />
              {/* Thống kê ngày */}
              <DateTimeFilter />
            </div>
            {/* Chân trang */}
            <Footer />
          </div>
        </div>
      }
    </div>
  );
};

export default HomePage;
