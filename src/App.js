import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

import { supabase } from "./supabase";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, signIn } = useContext(AuthContext);
  const isLoggedIn = user !== null;

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        signIn(data.user);
      }
    }
    getUser();
  }, [signIn]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {isLoggedIn && (
        <>
          <Route path="/home" element={<Home />} />
        </>
      )}
    </Routes>
  );
}

export default App;
