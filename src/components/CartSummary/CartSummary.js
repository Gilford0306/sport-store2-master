import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

function CartSummary() {
  const { selectedItems } = useCart();
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate(); // Используем хук useNavigate для навигации

  useEffect(() => {
    const calculateTotals = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      setTotalCost(total);

      const delivery = total > 0 && total < 3000 ? 200 : 0;
      setDeliveryCost(delivery);

      setTotalAmount(total + delivery);
    };

    calculateTotals();
  }, [selectedItems]);

  useEffect(() => {
    setTotalCost(0);
    setDeliveryCost(0);
    setTotalAmount(0);

    // Очистка localStorage (если используется для хранения состояния)
    localStorage.removeItem("cartItems"); // Или другой ключ, если используется
  }, [location.pathname]);

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <div className="cart-summary">
      <h3>Итоги заказа</h3>
      <div>Стоимость товаров: {totalCost} грн</div>
      <div>Стоимость доставки: {deliveryCost} грн</div>
      <div>Всего: {totalAmount} грн</div>
      <button className="checkout-button" onClick={handleCheckout}>
        Перейти к оплате
      </button>
    </div>
  );
}

export default CartSummary;
