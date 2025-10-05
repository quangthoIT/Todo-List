import React from "react";
import Lottie from "lottie-react"; // npm install lottie-react
import error404 from "../assets/Error 404.json";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <Lottie
        animationData={error404}
        loop={true}
        className="w-96 h-96 sm:w-[560px] sm:h-[560px]"
      />

      <a
        href="/"
        className="inline-block px-5 py-3 mt-5 font-medium text-white bg-[#6C21E5] transition shadow-md rounded-xl hover:bg-[#5614D2]"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;
