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
            console.log("Stored meal found:", storedMeal);
            setGeneratedMeal(JSON.parse(storedMeal));
        }
    }, []);

    const generateMeal = async () => {
        const email = user.email;
        setLoading(true);
        localStorage.removeItem("generatedMeal"); // Clear previous meal

        try {
            console.log("Generating meal for:", email);
            await axios.get(
                `https://nutrition-ai-backend.onrender.com/meal/generate_meal/${email}`,
                {
                    headers: { accept: "application/json" },
                    params: { email_id: email },
                }
            );
            await showMeal(); // Fetch and show meal after generation
        } catch (error) {
            console.error("Error generating meal:", error);
        } finally {
            setLoading(false);
        }
    };

    const showMeal = async () => {
        try {
            console.log("Fetching meal for display...");
            const response = await axios.get(
                `https://nutrition-ai-backend.onrender.com/meal/show_meal/${user.email}`,
                {
                    headers: { accept: "application/json" },
                    params: { email_id: user.email },
                }
            );

            const mealData = response.data;
            console.log("Meal data fetched:", mealData);

            if (mealData && mealData.length > 0) {
                setGeneratedMeal(mealData);
                localStorage.setItem("generatedMeal", JSON.stringify(mealData));
            } else {
                console.error("No meal data returned from API");
            }
        } catch (error) {
            console.error("Error showing meal:", error);
        }
    };

    useEffect(() => {
        if (generatedMeal) {
            console.log("Generated Meal state updated:", generatedMeal);
        }
    }, [generatedMeal]);

    if (loading) {
        return (
            <div className="w-full flex justify-center">
                <div className="loading loading-dots loading-lg bg-[#41b2de]"></div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center p-5 overflow-auto">
            <button
                className="btn btn-info text-white text-lg font-semibold mb-10 w-fit"
                onClick={generateMeal}
            >
                Generate Meal
            </button>

            {generatedMeal ? (
                <div className="w-full">
                    <MealPlan mealDetails={generatedMeal} />
                </div>
            ) : (
                <div>No meals available</div>
            )}
        </div>
    );
};

export default MealGenerator;