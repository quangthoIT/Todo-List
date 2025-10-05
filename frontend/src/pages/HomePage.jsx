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
  );
};

export default HomePage;
