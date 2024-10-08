import React from "react";
import { useFavorites } from "../components/contexts/FavoritesContext";
import FavoriteItem from "../components/FavoriteItem/FavoriteItem";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (id) => {
    removeFavorite(id);
  };

  return (
    <div className="favorites-page">
      {favorites.length === 0 ? (
        <div className="favorites-items-zero">
          <h3>Обрані</h3>
          <p>У вас немає обраних речей</p>
        </div>
      ) : (
        <div className="favorites-items">
          {favorites.map((item) => (
            <FavoriteItem key={item.id} item={item} onRemove={handleRemove}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;

