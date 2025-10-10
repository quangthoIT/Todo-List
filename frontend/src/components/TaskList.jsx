import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({filteredTasks}) => {
  let filter = "all";

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
