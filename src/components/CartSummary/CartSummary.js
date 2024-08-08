import React from 'react';


function CartSummary() {
  return (
    <div className="cart-summary">
      <h3>Итоги заказа</h3>
      <div>Стоимость товаров: ...</div>
      <div>Стоимость доставки: ...</div>
      <div>Всего: ...</div>
      <button className="checkout-button">Перейти к оплате</button>
    </div>
  );
}

export default CartSummary;
