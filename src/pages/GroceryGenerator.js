import React, { useState } from "react";
import axios from "axios";

const GroceryGenerator = () => {
  const [groceryList, setGroceryList] = useState([]);

  const generateGroceryList = async () => {
    try {
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
            email_id: "ankurvermaaxz@gmail.com",
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
            email_id: "ankurvermaaxz@gmail.com",
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
        // Combine or use the data as needed
        const combinedGroceryList = [...generateData, ...parsedGroceryList];

        // Update the state with the combined grocery list
        setGroceryList(combinedGroceryList);
      } else {
        console.error(
          "Invalid data format for parsedGroceryList:",
          parsedGroceryList
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button
        style={{
          border: "2px solid #333",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={generateGroceryList}
      >
        Generate Grocery
      </button>

      {/* Display the generated grocery list horizontally */}
      <div style={{ whiteSpace: "pre-wrap" }}>{groceryList}</div>
    </div>
  );
};

export default GroceryGenerator;
