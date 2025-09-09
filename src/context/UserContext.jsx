// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useSupabaseAuth } from "../supabase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { signUp, login, logout, getUserInfo } = useSupabaseAuth();
  const [user, setUser] = useState(null);

  // 앱 시작 시 localStorage에서 유저 정보 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // user 상태가 바뀔 때 localStorage 업데이트
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signUp,
        login,
        logout,
        getUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
