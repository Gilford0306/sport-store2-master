// src/pages/CartPage.js
import React from "react";
import { useCart } from "../components/contexts/CartContext";
import CartItem from "../components/CartItem/CartItem";
import CartSummary from "../components/CartSummary/CartSummary";
import "./CartPage.css";

function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="cart-items">
          <h3>Кошик</h3>
          <p>У вашому кошику немає речей</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
      <CartSummary />
    </div>
  );
}

export default CartPage;
