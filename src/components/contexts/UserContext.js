import React, { createContext, useState, useContext, useEffect } from "react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { setUser: setCartUser } = useCart(); // Функция из CartContext
  const { setUser: setFavoritesUser } = useFavorites(); // Функция из FavoritesContext

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    const savedUserId = localStorage.getItem("userId");

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      if (savedUserId) {
        setCartUser(savedUserId);
        setFavoritesUser(savedUserId);
      }
    }
  }, [setCartUser, setFavoritesUser]); // Добавляем зависимости

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");

    setCartUser(null);
    setFavoritesUser(null);
  };

  const login = (user) => {
    setUserProfile(user);
    localStorage.setItem("userProfile", JSON.stringify(user));
    localStorage.setItem("userId", user.id);
    setCartUser(user.id);
    setFavoritesUser(user.id);
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
