import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Landing() {

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
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[url('assets/background/bg.jpg')] bg-cover bg-center overflow-auto">
        <h1 className="font-bold text-stone-900 text-5xl sm:text-7xl lg:text-9xl -mt-20">
          MealMentor
        </h1>
        <p className="text-2xl text-stone-900 sm:text-3xl font-medium text-center mt-4"> Your Personal Nutrition Assistant for Smarter, Healthier Meals..</p>
        <button className="mt-8 px-6 py-4 text-lg font-medium bg-stone-50 hover:bg-stone-200 text-black rounded-lg
        transition-all duration-100 border-none"
        onClick={user ? () => navigate("/home") : handleSignIn}>
          {user ? `Welcome, ${user.email}` : "Get started"}
        </button>
    </div>
  );
}
