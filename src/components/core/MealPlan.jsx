import React, { useEffect } from "react";

const MealPlan = ({ mealDetails }) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              day
            </th>
            <th scope="col" className="px-6 py-3">
              breakfast
            </th>
            <th scope="col" className="px-6 py-3">
              lunch
            </th>
            <th scope="col" className="px-6 py-3">
              dinner
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            
            
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MealPlan;
