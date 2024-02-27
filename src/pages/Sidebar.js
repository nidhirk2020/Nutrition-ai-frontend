import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-w-[10rem] flex flex-col gap-1 pt-4 border-r border-base-300">
      <div className="p-[0.5rem]">
        <Link
          to="/home"
          className="rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer"
        >
          Home
        </Link>
      </div>
      <div className="p-[0.5rem]">
        <Link
          to="/userinfo"
          className="rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer"
        >
          User Information
        </Link>
      </div>
      <div className="p-[0.5rem]">
        <Link
          to="/mealgenerator"
          className="rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer"
        >
          Generate Meal
        </Link>
      </div>
      <div className="p-[0.5rem]">
        <Link
          to="/grocerygenerator"
          className="rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer"
        >
          Generate Grocery List
        </Link>
      </div>
      <div className="p-[0.5rem]">
        <Link
          to="/chat"
          className="rounded-md text-center text-lg hover:bg-base-200 transition-all duration-100 cursor-pointer"
        >
          Chat
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
