import React from "react";
import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Soft Morning Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(135deg,
        rgba(247,249,255,1) 0%,
        rgba(210,225,255,0.8) 30%,
        rgba(180,195,255,0.6) 60%,
        rgba(160,175,255,0.7) 100%
      ),
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(190,200,255,0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 85%, rgba(200,210,255,0.3) 0%, transparent 60%)
    `,
        }}
      />
      {
        /* Your Content/Components */
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl pt-6 mx-auto space-y-6">
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
