import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartSummary.css";

function CartSummary() {
  const { cartItems, selectedItems, updateItemChecked } = useCart();
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allSelected, setAllSelected] = useState(false); // Добавляем состояние для отслеживания выбора всех чекбоксов
  const location = useLocation();
  const navigate = useNavigate();

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

    localStorage.removeItem("cartItems");
  }, [location.pathname]);

  const handleCheckout = () => {
    navigate("/order");
  };

  const handleSelectAll = () => {
    const newSelectionState = !allSelected;
    setAllSelected(newSelectionState);

    cartItems.forEach((item) => {
      updateItemChecked(item.id, newSelectionState);
    });
  };

  return (
    <div className="cart-summary">
      <button
        className="cart-summary__button add-favorites"
        onClick={handleCheckout}
      >
        Придбати обране
      </button>
      <button
        className="cart-summary__button select-all"
        onClick={handleSelectAll}
      >
        {allSelected ? "Зняти виділення" : "Обрати все"}{" "}
        {/* Меняем текст кнопки */}
      </button>

      <div className="cart-summary__promo">
        <label>У вас є промокод?</label>
        <div className="cart-summary__promo-input">
          <input type="text" placeholder="Введіть промокод" />
          <button className="apply-promo">Застосувати</button>
        </div>
      </div>

      <div className="cart-summary__totals">
        <div>
          Вартість доставки: <span>{totalCost} грн</span>
        </div>
        <div>
          Вартість товарів: <span>{deliveryCost} грн</span>
        </div>
        <hr />
        <div>
          Всього: <span>{totalAmount} грн</span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
