import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = () => {
  let filter = "all";
  const filteredTasks = [
    {
      _id: "1",
      title: "Task 1",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Task 2",
      status: "completed",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3 mx-5 sm:mx-0">
      {/* Trả về danh sách task theo filter */}
      {filteredTasks.map((task, index) => {
        // Trả về task theo index
        return <TaskCard key={task._id ?? index} task={task} index={index} />;
      })}
    </div>
  );
};

export default TaskList;
