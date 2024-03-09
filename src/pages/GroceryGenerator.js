import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const GroceryGenerator = () => {
  const { user } = useAuth();
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateGroceryList = async () => {
    const email = user.email;
    try {
      setLoading(true);
      // First API call to generate grocery
      const generateResponse = await axios.post(
        "https://nutrition-ai.onrender.com/chat_ai/grocery_list_generator",
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

      // Assuming the response contains the generated grocery list
      const generateData = generateResponse.data;

      // Second API call to show grocery list
      const showResponse = await axios.post(
        "https://nutrition-ai.onrender.com/chat_ai/show_grocery_list",
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
      
      // commaSeparatedList = parsedGroceryList.join(', ');

      // Check if parsedGroceryList is iterable (an array)
      if (Array.isArray(parsedGroceryList)) {
        // Update the state with the parsed grocery list
        setGroceryList(parsedGroceryList);
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
    <div className="w-full flex flex-col items-center p-5">
      <button
        className="btn btn-info text-lg font-semibold text-white mb-10 w-fit"
        onClick={generateGroceryList}
      >
        Generate Grocery
      </button>

      {/* Display the generated grocery list horizontally */}
      <div style={{ whiteSpace: "pre-wrap" }}>
      <ol style={{ listStyle: 'none', paddingLeft: '20px' }}>
        {groceryList.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <input type="checkbox" id={`item-${index}`} />
            <label htmlFor={`item-${index}`} style={{ marginLeft: '10px' }}>{item}</label>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
};

export default GroceryGenerator;
