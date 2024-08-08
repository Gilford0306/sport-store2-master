import React from 'react';
import IconButton from '../IconButton/IconButton';
import ProductImage from '../ProductImage/ProductImage';
import ProductDescription from '../ProductDescription/ProductDescription';
import './CartItem.css';

function CartItem({ item }) {
  return (
    <div className="cart-item">
      <IconButton icon="trash" onClick={() => console.log('Удалить товар из корзины')} />
      <ProductImage src={item.image} alt={item.name} />
      <ProductDescription name={item.name} description={item.description} />
      <div className="item-price">{item.price}</div>
    </div>
  );
}

export default CartItem;