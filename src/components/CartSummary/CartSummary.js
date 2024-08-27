import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartSummary.css";

function CartSummary() {
  const { cartItems, selectedItems, updateItemChecked } = useCart();
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allSelected, setAllSelected] = useState(false); 
  const [promoCode, setPromoCode] = useState(""); // Состояние для промокода
  const [discountApplied, setDiscountApplied] = useState(false); // Состояние для отслеживания применения скидки
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotals = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      setTotalCost(total);

      const delivery = total > 0 && total < 3000 ? 200 : 0;
      setDeliveryCost(delivery);

      let amount = total + delivery;
      if (discountApplied) {
        amount -= 100; // Применение скидки
      }
      setTotalAmount(Math.max(amount, 0)); // Убедиться, что сумма не отрицательная
    };

    calculateTotals();
  }, [selectedItems, discountApplied]);

  useEffect(() => {
    setTotalCost(0);
    setDeliveryCost(0);
    setTotalAmount(0);
    setDiscountApplied(false); // Сброс скидки при изменении пути

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

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === "111") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
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
      </button>

      <div className="cart-summary__promo">
        <label>У вас є промокод?</label>
        <div className="cart-summary__promo-input">
          <input
            type="text"
            placeholder="Введіть промокод"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          <button
            className="apply-promo"
            onClick={applyPromoCode}
          >
            Застосувати
          </button>
        </div>
      </div>

      <div className="cart-summary__totals">
        <div>
          Вартість доставки: <span>{deliveryCost} грн</span>
        </div>
        <div>
          Вартість товарів: <span>{totalCost} грн</span>
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
