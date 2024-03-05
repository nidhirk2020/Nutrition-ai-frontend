import React, { useState, useEffect } from "react";
import axios from "axios";

const MealGenerator = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [generatedMeal, setGeneratedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user information
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(
          "https://nutrition-ai.onrender.com/mongo_db/read_user_info_from_mongo",
          {},
          {
            headers: {
              accept: "application/json",
              "email-id": "ankurvermaaxz@gmail.com",
            },
          }
        );

        // Update state with user information
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const generateMeal = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nutrition-ai.onrender.com/chat_ai/meal_generator",
        {},
        {
          headers: {
            accept: "application/json",
          },
          params: {
            email_id: "ankurvermaaxz@gmail.com",
          },
        }
      );

      // Update state with generated meal
      setGeneratedMeal(response.data);

      // After generating meal, show it
      showMeal();
    } catch (error) {
      console.error("Error generating meal:", error);
    }
    setLoading(false);
  };

  const showMeal = async () => {
    try {
      const response = await axios.post(
        "https://nutrition-ai.onrender.com/chat_ai/show_meal",
        {},
        {
          headers: {
            accept: "application/json",
          },
          params: {
            email_id: "ankurvermaaxz@gmail.com",
          },
        }
      );

      // Log or update state with the meal details as needed
      console.log("Meal details:", response.data);
    } catch (error) {
      console.error("Error showing meal:", error);
    }
  };

  if (loading) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "2px solid #4CAF50",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={generateMeal}
      >
        Generate Meal
      </button>

      {generatedMeal && (
        <div>
          <h2>Generated Meal</h2>
          <pre>{JSON.stringify(generatedMeal, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MealGenerator;
