import React, { createContext, useState, useContext, useEffect } from "react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { setUser: setCartUser } = useCart();
  const { setUser: setFavoritesUser } = useFavorites();

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
  }, [setCartUser, setFavoritesUser]);

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");

    setCartUser(null);
    setFavoritesUser(null);
  };

  const login = (user, token, refreshToken) => {
    setUserProfile(user);
    localStorage.setItem("userProfile", JSON.stringify(user));
    localStorage.setItem("userId", user.id);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setCartUser(user.id);
    setFavoritesUser(user.id);
  };

  return (
    <UserContext.Provider
      value={{ userProfile, login, logout, userId: userProfile?.id }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
