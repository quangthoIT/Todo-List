import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-950 bg-clip-text text-transparent">
        Todo List
      </h1>
      <p className="text-slate-500 italic">
        Không có việc gì khó, chỉ sợ mình không làm !
      </p>
    </div>
  );
};

export default Header;
