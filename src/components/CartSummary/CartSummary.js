import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

function CartSummary() {
  const { selectedItems } = useCart();
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      setTotalCost(total);

      // Рассчитываем стоимость доставки
      const delivery = total < 3000 ? 200 : 0;
      setDeliveryCost(delivery);

      // Рассчитываем общую сумму
      setTotalAmount(total + delivery);
    };

    calculateTotals();
  }, [selectedItems]);

  return (
    <div className="cart-summary">
      <h3>Итоги заказа</h3>
      <div>Стоимость товаров: {totalCost} грн</div>
      <div>Стоимость доставки: {deliveryCost} грн</div>
      <div>Всего: {totalAmount} грн</div>
      <button className="checkout-button">Перейти к оплате</button>
    </div>
  );
}

export default CartSummary;
