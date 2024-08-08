// FavoriteItem.js
import React from 'react';
import IconButton from '../IconButton/IconButton';
import ProductImage from '../ProductImage/ProductImage';
import ProductDescription from '../ProductDescription/ProductDescription';


function FavoriteItem({ item }) {
  return (
    <div className="favorite-item">
      <IconButton icon="heart" />
      <ProductImage src={item.image} alt={item.name} />
      <ProductDescription name={item.name} description={item.description} />
      <div className="item-price">{item.price}</div>
    </div>
  );
}

export default FavoriteItem;
