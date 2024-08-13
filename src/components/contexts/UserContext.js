import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Загрузка информации о пользователе из localStorage при инициализации
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile"); // Удаление профиля пользователя из localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId"); // Убедитесь, что все связанные данные также удаляются
  };

  const login = (user) => {
    setUserProfile(user);
    localStorage.setItem("userProfile", JSON.stringify(user));
    // Также можно сохранить токены и userId здесь
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
