import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title || "");
  const deleteTask = async (taskID) => {
    try {
      await api.delete(`/tasks/${taskID}`);
      toast.success("Xóa nhiệm vụ thành công.");
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi xảy ra khi xóa nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updatedTaskTitle,
      });
      toast.success("Cập nhật nhiệm vụ thành công.");
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi xảy ra khi cập nhật nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    }
  };

  const toggleTaskcompletedButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success("Đã hoàn thành nhiệm vụ.");
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success("Đang làm nhiệm vụ.");
      }
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi xảy ra khi update nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi update nhiệm vụ.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask(task._id);
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-slate-50 border-0 shadow-md hover:shadow-lg transition-all duration-200 group",
        task.status === "completed" && "opacity-75"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox hoàn thành */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200 cursor-pointer",
            task.status === "completed"
              ? "text-green-500 hover:text-green-600"
              : "text-slate-500 hover:text-slate-600"
          )}
          onClick={toggleTaskcompletedButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0 space-y-1">
          {/* Tên nhiệm vụ */}
          {isEditing ? (
            <Input
              className="flex-1 h-12 text-base border border-slate-300 shadow-sm focus:border-slate-500  focus:ring-slate-200"
              placeholder={task.title}
              type="text"
              value={updatedTaskTitle}
              onChange={(e) => setUpdatedTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdatedTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-slate-400"
                  : "text-slate-800"
              )}
            >
              {task.title}
            </p>
          )}
          <div className="flex gap-2 items-center">
            {/* Thời gian tạo nhiệm vụ */}
            <Calendar className="size-3 text-slate-500" />
            <span className="text-xs text-slate-500">
              {new Date(task.createdAt).toLocaleString("vi-VN")}
            </span>
            {/* Thời gian hoàn thành */}
            {task.completedAt && (
              <>
                <span className="text-xs text-slate-500"> - </span>
                <Calendar className="size-3 text-slate-500" />
                <span className="text-xs text-slate-500">
                  {new Date(task.completedAt).toLocaleString("vi-VN")}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex">
          {/* Sửa */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsEditing(true);
              setUpdatedTaskTitle(task.title || "");
            }}
            className="flex-shrink-0 transition-all duration-200 size-8 text-slate-500 hover:text-blue-600 hover:bg-blue-100 cursor-pointer"
          >
            <SquarePen className="size-4" />
          </Button>
          {/* Xoá */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task._id)}
            className="flex-shrink-0 transition-all duration-200 size-8 text-slate-500 hover:text-red-600 hover:bg-red-100 cursor-pointer"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
