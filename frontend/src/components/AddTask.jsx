import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTask = () => {
  return (
    <Card className="p-6 border-0 bg-slate-50 shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Nhập nhiệm vụ"
          className="h-12 bg-slate-100 sm:flex-1 border border-slate-300 shadow-sm focus:border-slate-500  focus:ring-slate-200"
        />

        <Button variant="mine" size="xl">
          <Plus />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
