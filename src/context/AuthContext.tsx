import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("bookify_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("bookify_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bookify_user");
    }
  }, [user]);

  const login = (email: string): boolean => {
    // Mock login: accepts any valid email, extracts a display name from it
    const name = email.split("@")[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    setUser({ name: formattedName, email });
    return true;
  };

  const signup = (name: string, email: string, _password: string): boolean => {
    // Mock signup: saves user profile instantly
    setUser({ name, email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};