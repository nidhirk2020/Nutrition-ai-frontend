import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-w-[13rem] pt-2 h-[100%] flex flex-col gap-1 border-r border-base-300">
      <Link
        to="/home"
        className="text-lg py-[0.5rem] px-[0.7rem] hover:bg-base-200 transition-all duration-100 cursor-pointer"
      >
        Home
      </Link>
      <Link
        to="/userinfo"
        className="text-lg py-[0.5rem] px-[0.7rem] hover:bg-base-200 transition-all duration-100 cursor-pointer"
      >
        User Information
      </Link>
      <Link
        to="/mealgenerator"
        className="text-lg py-[0.5rem] px-[0.7rem] hover:bg-base-200 transition-all duration-100 cursor-pointer"
      >
        Generate Meal
      </Link>
      <Link
        to="/grocerygenerator"
        className="text-lg py-[0.5rem] px-[0.7rem] hover:bg-base-200 transition-all duration-100 cursor-pointer"
      >
        Generate Grocery List
      </Link>
      <Link
        to="/chat"
        className="text-lg py-[0.5rem] px-[0.7rem] hover:bg-base-200 transition-all duration-100 cursor-pointer"
      >
        Chat
      </Link>
    </div>
  );
};

export default Sidebar;
