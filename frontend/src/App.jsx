import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // npm install react-router-dom
import { Toaster} from "sonner"; // npm install sonner
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
