// src/contexts/FavoritesContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedFavorites = localStorage.getItem(`favorites-${storedUserId}`);

    if (storedUserId) {
      setUserId(storedUserId);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`favorites-${userId}`, JSON.stringify(favorites));
    }
  }, [favorites, userId]);

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(`favorites-${userId}`);
  };

  const setUser = (id) => {
    setUserId(id);
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        setUser, // Убедитесь, что setUser здесь
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
