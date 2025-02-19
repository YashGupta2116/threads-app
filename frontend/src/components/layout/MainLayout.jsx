import React from "react";
import Navbar from "@/components/navbar/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 ml-16 lg:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
