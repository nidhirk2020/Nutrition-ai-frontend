import React, { useState, useEffect } from "react";
import axios from "axios";
import MealPlan from "../components/core/MealPlan";
import { useAuth } from "../context/AuthContext";

const MealGenerator = () => {
  const { user } = useAuth();
  const [generatedMeal, setGeneratedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load stored meal data on component mount
  useEffect(() => {
    const storedMeal = localStorage.getItem("generatedMeal");
    if (storedMeal) {
      setGeneratedMeal(JSON.parse(storedMeal));
    }
  }, []);

  const generateMeal = async () => {
    const email = user.email;
    setLoading(true);

    // Clear previously stored meal
    localStorage.removeItem("generatedMeal");

    try {
          const response = await axios.get(
      `https://nutrition-ai-backend.onrender.com/meal/generate_meal/${email}`,
      {
        headers: {
          accept: "application/json",
        },
        params: {
          email_id: email,
        },
      }
    );

    
      showMeal();
    } catch (error) {
      console.error("Error generating meal:", error);
    }
    setLoading(false);
  };

  const showMeal = async () => {
    try {
      const response = await axios.get(
    `https://nutrition-ai-backend.onrender.com/meal/show_meal/${user.email}`,
    {
      headers: {
        accept: "application/json",
      },
      params: {
        email_id: user.email,
      },
    }
  );
    

      const mealData = response.data;
      setGeneratedMeal(mealData);
      localStorage.setItem("generatedMeal", JSON.stringify(mealData)); // Store meal data in localStorage
      console.log("Meal details:", mealData);
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
