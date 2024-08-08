import React from 'react';
import CartItem from '../components/CartItem/CartItem';
import CartSummary from '../components/CartSummary/CartSummary';
import './CartPage.css';



function CartPage() {
  const cartItems = [
    { id: 1, name: 'Назва товару', description: 'Опис товару', price: 'Ціна', image: 'image_url' },
    // Добавьте остальные товары...
  ];

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}

export default CartPage;
