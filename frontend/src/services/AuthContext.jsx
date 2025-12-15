import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    return data.user;
  };

  // ✅ REGISTER
  const register = async (payload) => {
    await api.post("/api/auth/register", payload);
    return login(payload.email, payload.password);
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore logout errors
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
