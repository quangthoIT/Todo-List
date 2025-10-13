import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {/* Nếu có nhiệm vụ hoàn thành hoặc nhiệm vụ đang làm thì hiển thị */}
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-slate-500">
            {/* Có nhiệm vụ đã hoàn thành và không có nhiệm vụ đang làm */}
            {completedTasksCount > 0 &&
              activeTasksCount === 0 &&
              `
                Tuyệt vời ! Bạn đã hoàn thành ${completedTasksCount} nhiệm vụ.`}
            {/* Có nhiệm vụ đã hoàn thành và có nhiệm vụ đang làm */}
            {completedTasksCount > 0 &&
              activeTasksCount > 0 &&
              `Bạn đã hoàn thành ${completedTasksCount} nhiệm vụ và đang còn ${activeTasksCount} nhiệm vụ. Cố lên!`}
            {/* Không có nhiệm vụ đã hoàn thành và có nhiệm vụ đang làm */}
            {completedTasksCount === 0 &&
              activeTasksCount > 0 &&
              `Hãy bắt đầu làm ${activeTasksCount} nhiệm vụ nào. Cố lên!`}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
