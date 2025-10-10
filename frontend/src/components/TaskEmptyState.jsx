import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-slate-50 shadow-md">
      <div className="space-y-3">
        {/* Icon */}
        <Circle className="mx-auto size-12 text-slate-500" />
        <div className="space-y-1">
          {/* Tiêu đề thông báo */}
          <h3 className="font-medium">
            {filter === "active"
              ? "Không có nhiệm vụ nào đang làm !"
              : filter === "completed"
              ? "Không có nhiệm vụ nào hoàn thành !"
              : "Không có nhiệm vụ nào !"}
          </h3>
          {/* Nội dung */}
          <p className="text-sm text-slate-500">
            {filter === "all"
              ? "Thêm nhiệm vụ mới để bắt đầu !"
              : `Chuyển sang Tất cả để thấy những nhiệm vụ ${
                  filter === "active" ? "hoàn thành." : "đang làm."
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
