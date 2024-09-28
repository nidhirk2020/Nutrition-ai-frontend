import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const GroceryGenerator = () => {
  const { user } = useAuth();
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load stored grocery list on component mount
  useEffect(() => {
    const storedGroceryList = localStorage.getItem("groceryList");
    if (storedGroceryList) {
      setGroceryList(JSON.parse(storedGroceryList));
    }
  }, []);

  const generateGroceryList = async () => {
    const email = user.email;
    setLoading(true);

    // Clear previously stored grocery list
    localStorage.removeItem("groceryList");

    try {
      // First API call to generate grocery
      const generateResponse = await axios.post(
        "https://nutrition-ai-backend.onrender.com/grocery/generate_grocery_list",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            email_id: email,
          },
        }
      );

      // Second API call to show grocery list
      const showResponse = await axios.post(
        "https://nutrition-ai-backend.onrender.com/grocery/show_grocery_list",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            email_id: email,
          },
        }
      );

      // Assuming the response contains the displayed grocery list as a string
      const showData = showResponse.data;

      // Split the string into an array using commas as the delimiter
      const parsedGroceryList = showData.grocery_list
        .split(",")
        .map((item) => item.trim());

      // Check if parsedGroceryList is iterable (an array)
      if (Array.isArray(parsedGroceryList)) {
        // Update the state with the parsed grocery list
        setGroceryList(parsedGroceryList);
        // Store the grocery list in localStorage
        localStorage.setItem("groceryList", JSON.stringify(parsedGroceryList));
      } else {
        console.error(
          "Invalid data format for parsedGroceryList:",
          parsedGroceryList
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full flex justify-center">
        <div className="loading loading-dots loading-lg bg-[#41b2de]"></div>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center p-5 overflow-auto">
      <button
        className="btn btn-info text-lg font-semibold text-white mb-10 w-fit"
        onClick={generateGroceryList}
      >
        Generate Grocery
      </button>

      {/* Display the generated grocery list horizontally */}
      <div style={{ whiteSpace: "pre-wrap" }}>
        <ol className="pl-5">
          {groceryList.map((item, index) => (
            <li key={index} className="mb-[10px] flex items-center gap-1">
              <input
                type="checkbox"
                id={`item-${index}`}
                className="checkbox checkbox-info"
              />
              <label htmlFor={`item-${index}`} className="ml-[10px] capitalize">
                {item}
              </label>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GroceryGenerator;

