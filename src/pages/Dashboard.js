import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
