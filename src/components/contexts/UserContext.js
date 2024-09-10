import React, { createContext, useState, useContext, useEffect } from "react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import defaultPhoto from "../assets/Ellipse9.png"; 
import API_BASE_URL from "../../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null); // Состояние для фото

  const { setUser: setCartUser } = useCart();
  const { setUser: setFavoritesUser } = useFavorites();

  const loadUserProfile = async () => {
    const savedProfile = localStorage.getItem("userProfile");
    const savedUserId = localStorage.getItem("userId");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile({
        id: profile.id,
        userName: profile.userName,
        email: profile.email,
        roles: profile.roles,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthdate: profile.birthdate,
        phoneNumber: profile.phoneNumber,
      });

      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/Auth/GetProfilePhoto`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.FileContents) {
            const base64String = data.FileContents;
            const photoUrl = `data:image/png;base64,${base64String}`;
            setUserPhoto(photoUrl);
          } else {
            setUserPhoto(null); 
          }
        } else {
          setUserPhoto(null);
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
        setUserPhoto(null); 
      }

      if (savedUserId) {
        setCartUser(savedUserId);
        setFavoritesUser(savedUserId);
      }
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, [setCartUser, setFavoritesUser]);

  const logout = () => {
    setUserProfile(null);
    setUserPhoto(null); // Очистка фото при выходе
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
        userPhoto: userPhoto || defaultPhoto, // Используем дефолтное фото, если пользовательское фото отсутствует
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
