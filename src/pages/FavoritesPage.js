// FavoritesPage.js
import React from 'react';
import FavoriteItem from '../components/FavoriteItem/FavoriteItem';
import './FavoritesPage.css';

function FavoritesPage() {
  const favoriteItems = [
    { id: 1, name: 'Назва товару', description: 'Опис товару', price: 'Ціна', image: 'image_url' },
    // Добавьте остальные товары...
  ];

  return (
    <div className="favorites-page">
      <div className="favorites-items">
        {favoriteItems.map(item => (
          <FavoriteItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
