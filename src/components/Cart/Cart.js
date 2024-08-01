import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
