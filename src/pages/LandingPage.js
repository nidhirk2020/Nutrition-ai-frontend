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
    <div>
      <div>
        <h1>
          Nutrition AI <br />
          <span style={{ color: "red" }}>AI for Nutrition</span>
        </h1>
        <p>Empowering your nutrition journey with the power of AI.</p>
        <div>
          {user ? (
            <button onClick={() => navigate("/home")}>
              Welcome, {user.email}
            </button>
          ) : (
            <button onClick={handleSignIn}>Get started</button>
          )}
        </div>
      </div>
    </div>
  );
}
