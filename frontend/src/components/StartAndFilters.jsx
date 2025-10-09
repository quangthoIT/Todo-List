import React from "react";
import { Badge } from "./ui/badge";
import { FilterTypes } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StartAndFilters = ({
  activeTasksCount = 0,
  completedTasksCount = 0,
  filter = "all",
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-slate-50 border-slate-300 text-blue-500 font-semibold text-sm"
        >
          {activeTasksCount} {FilterTypes.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-slate-50 border-slate-300 text-green-500 font-semibold text-sm"
        >
          {completedTasksCount} {FilterTypes.completed}
        </Badge>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-row gap-3">
        {Object.keys(FilterTypes).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "mine" : "secondary"}
            size="sm"
          >
            <Filter className="size-4" />
            {FilterTypes[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StartAndFilters;
