import React, { useState } from 'react';
import { useCart } from '../components/contexts/CartContext'; // Подключение контекста корзины

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const { selectedItems, userId } = useCart(); // Используем данные из контекста корзины

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
  };

  const handleSubmitOrder = async () => {
    const order = {
      ProductId: selectedItems.map(item => item.id),
      UserId: 1,
      StatusId: 1, // Например, статус по умолчанию
      Amount: selectedItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
    };

    // try {
    //   const response = await fetch('https://localhost:7000/api/Order/CreateOrder', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('token')}`, // Если нужно
    //     },
    //     body: JSON.stringify(order),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(`Error creating order: ${errorData.message || 'Unknown error'}`);
    //   }

    //   const result = await response.json();
    //   console.log('Order created:', result);
    //   setStep(4); 
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('Error creating order');
    // }
  };

  return (
    <main>
      <h1>Оформлення замовлення</h1>

      {step === 1 && (
        <form onSubmit={handleContinue}>
          <h2>Ваші дані</h2>
          <label htmlFor="firstName">Ім'я:</label>
          <input type="text" id="firstName" name="firstName" required />

          <label htmlFor="lastName">Прізвище:</label>
          <input type="text" id="lastName" name="lastName" required />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Номер телефону:</label>
          <input type="tel" id="phone" name="phone" required />

          <button type="submit" className="continue-button">Продовжити</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleContinue}>
          <h2>Варіанти доставки</h2>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="storePickup"
                onChange={handleDeliveryChange}
              />
              Доставка в магазин
            </label>
            <label>
              <input
                type="radio"
                name="deliveryMethod"
                value="branchDelivery"
                onChange={handleDeliveryChange}
              />
              Доставка у відділення
            </label>
          </div>

          {deliveryMethod === "branchDelivery" && (
            <div className="branch-delivery-options">
              <label>
                <input type="checkbox" name="novaPoshta" />
                Нова пошта
              </label>
              <label>
                <input type="checkbox" name="ukrPoshta" />
                Укр пошта
              </label>

              <label htmlFor="branchAddress">Місто та адреса:</label>
              <input type="text" id="branchAddress" name="branchAddress" required />

              <label htmlFor="branchNumber">Номер відділення:</label>
              <input type="text" id="branchNumber" name="branchNumber" required />
            </div>
          )}

          {deliveryMethod && (
            <div className="address-fields">
              <label htmlFor="country">Країна:</label>
              <input type="text" id="country" name="country" required />

              <label htmlFor="postalCode">Поштовий Індекс:</label>
              <input type="text" id="postalCode" name="postalCode" required />
            </div>
          )}

          <button type="submit" className="continue-button">Продовжити</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
          <h2>Оплата</h2>
          <label>
            <input
              type="radio"
              name="cardType"
              value="visa"
              onChange={handleCardTypeChange}
              required
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              name="cardType"
              value="mastercard"
              onChange={handleCardTypeChange}
              required
            />
            MasterCard
          </label>

          <label htmlFor="cardNumber">Номер картки:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <label htmlFor="expiryDate">Термін дії:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />

          <button type="submit" className="submit-button">Замовити</button>
        </form>
      )}

      {step === 4 && (
        <div className="thank-you">
          <h2>Дякуємо за замовлення</h2>
          <p>Очікуйте повідомлення про відправлення</p>
        </div>
      )}

      {step !== 1 && (
        <section className="selected-items">
          <h2>Обрані товари</h2>
          {selectedItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.price} грн</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default CheckoutPage;
