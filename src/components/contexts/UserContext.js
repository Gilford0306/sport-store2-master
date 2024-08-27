import React, { createContext, useState, useContext, useEffect } from "react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { setUser: setCartUser } = useCart();
  const { setUser: setFavoritesUser } = useFavorites();

  // Функция для загрузки профиля пользователя
  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem("userProfile");
    const savedUserId = localStorage.getItem("userId");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      // Преобразуйте профиль, если это необходимо
      setUserProfile({
        id: profile.id,
        userName: profile.userName,
        email: profile.email,
        roles: profile.roles,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthdate: profile.birthdate,  // Исправлено в соответствии с правильным именем поля
        phoneNumber: profile.phoneNumber,
      });
      if (savedUserId) {
        setCartUser(savedUserId);
        setFavoritesUser(savedUserId);
      }
    }
  };

  useEffect(() => {
    loadUserProfile(); // Загрузка профиля при монтировании компонента
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
      value={{
        userProfile,
        login,
        logout,
        loadUserProfile,
        userId: userProfile?.id,
        userRole: userProfile?.roles[0],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
