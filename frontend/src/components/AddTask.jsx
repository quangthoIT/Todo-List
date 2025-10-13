import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleTaskChange }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        // Gọi api tạo nhiệm vụ
        await api.post("/tasks", {
          // Truyền tham số title với giá trị newTaskTitle vào api
          title: newTaskTitle,
        });
        // Sử dụng handleTaskChange để cập nhật danh sách nhiệm vụ
        handleTaskChange();
        toast.success("Thêm nhiệm vụ thành công.");
        setNewTaskTitle("");
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ:", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ.");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Vui lòng nhập nội dung nhiệm vụ.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <Card className="p-6 border-0 bg-slate-50 shadow-md mx-5 sm:mx-0">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Nhập nhiệm vụ"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="h-12 bg-slate-100 sm:flex-1 border border-slate-300 shadow-sm focus:border-slate-500  focus:ring-slate-200"
        />

        <Button
          variant="mine"
          size="xl"
          onClick={addTask}
          disabled={!newTaskTitle}
        >
          <Plus />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
