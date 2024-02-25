import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Add a function to set the user when they sign in
  const signIn = (user) => {
    setUser(user);
  };

  // Add a function to sign out
  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
