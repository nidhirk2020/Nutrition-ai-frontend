import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { THEME } from "../utils/constants";

export default function Landing({theme}) {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.REACT_APP_BASE_URL}/home`,
        skipBrowserRedirect: false,
      },
    });
  };

  return (
    <div className={`w-full h-screen flex flex-col justify-center items-center ${theme === THEME.LIGHT ? "bg-[url('/public/assets/background/landing_light.jpg')]" : "bg-[url('/public/assets/background/landing_dark.jpg')]"}`}>
        <h1 className="font-bold text-5xl sm:text-7xl lg:text-8xl -mt-20">
          MealMentor
        </h1>
        <p className="text-2xl sm:text-3xl font-medium text-center mt-4"> Your Personal Nutrition Assistant for Smarter, Healthier Meals..</p>
        <div className="mt-8">
          {user ? (
            <button className="btn btn-md sm:btn-lg" onClick={() => navigate("/home")}>
              Welcome, {user.email}
            </button>
          ) : (
            <button className="btn btn-md sm:btn-lg" onClick={handleSignIn}>Get started</button>
          )}
        </div>
    </div>
  );
}
