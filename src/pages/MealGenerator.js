import React, { useState } from "react";
import axios from "axios";
import MealPlan from "../components/core/MealPlan";
import { useAuth } from "../context/AuthContext";

const MealGenerator = () => {
  const { user } = useAuth();
  const [generatedMeal, setGeneratedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateMeal = async () => {
    const email = user.email;
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
            email_id: email,
          },
        }
      );
      console.log(response);
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
            email_id: user.email,
          },
        }
      );

      // Log or update state with the meal details as needed
      // Update state with generated meal
      setGeneratedMeal(response.data);
      console.log("Meal details:", response.data);
    } catch (error) {
      console.error("Error showing meal:", error);
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
        className="btn btn-info text-white text-lg font-semibold mb-10 w-fit"
        onClick={generateMeal}
      >
        Generate Meal
      </button>

      {generatedMeal && (
        <div>
          <MealPlan mealDetails={generatedMeal} />
        </div>
      )}
    </div>
  );
};

export default MealGenerator;
