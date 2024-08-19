import React, { useState } from 'react';
import { useCart } from '../components/contexts/CartContext'; // Подключение контекста корзины

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [cardOption, setCardOption] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvvCode, setCvvCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const { selectedItems } = useCart(); // Используем данные из контекста корзины

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const handleCardOptionChange = (e) => {
    setCardOption(e.target.value);
  };

  const handleOrderSubmission = async () => {
    const order = {
      ProductId: selectedItems.map(item => item.id),
      StatusId: 1, // По умолчанию статус "в процессе" или другой начальный статус
      Amount: selectedItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
    };

    try {
      const response = await fetch('/api/Order/CreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order created:', data);
        setStep(4); // Переход на шаг 4
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <h1>Оформлення замовлення</h1>

      {step === 1 && (
        <form onSubmit={handleNextStep} className="checkout-form">
          <h2>Ваші дані</h2>
          <label htmlFor="firstNameInput">Ім'я:</label>
          <input type="text" id="firstNameInput" name="firstName" required />

          <label htmlFor="lastNameInput">Прізвище:</label>
          <input type="text" id="lastNameInput" name="lastName" required />

          <label htmlFor="emailInput">E-mail:</label>
          <input type="email" id="emailInput" name="email" required />

          <label htmlFor="phoneInput">Номер телефону:</label>
          <input type="tel" id="phoneInput" name="phone" required />

          <button type="submit" className="continue-button-check">Продовжити</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep} className="checkout-form">
          <h2>Варіанти доставки</h2>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="storePickup"
                onChange={handleDeliveryOptionChange}
              />
              Доставка в магазин
            </label>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="branchDelivery"
                onChange={handleDeliveryOptionChange}
              />
              Доставка у відділення
            </label>
          </div>

          {deliveryOption === "branchDelivery" && (
            <div className="branch-delivery-options">
              <label>
                <input type="checkbox" name="novaPoshtaOption" />
                Нова пошта
              </label>
              <label>
                <input type="checkbox" name="ukrPoshtaOption" />
                Укр пошта
              </label>

              <label htmlFor="branchAddressInput">Місто та адреса:</label>
              <input type="text" id="branchAddressInput" name="branchAddress" required />

              <label htmlFor="branchNumberInput">Номер відділення:</label>
              <input type="text" id="branchNumberInput" name="branchNumber" required />
            </div>
          )}

          {deliveryOption && (
            <div className="address-fields">
              <label htmlFor="countryInput">Країна:</label>
              <input type="text" id="countryInput" name="country" required />

              <label htmlFor="postalCodeInput">Поштовий Індекс:</label>
              <input type="text" id="postalCodeInput" name="postalCode" required />
            </div>
          )}

          <button type="submit" className="continue-button-check">Продовжити</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); handleOrderSubmission(); }} className="checkout-form">
          <h2>Оплата</h2>
          <label>
            <input
              type="radio"
              name="cardOption"
              value="visa"
              onChange={handleCardOptionChange}
              required
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              name="cardOption"
              value="mastercard"
              onChange={handleCardOptionChange}
              required
            />
            MasterCard
          </label>

          <label htmlFor="creditCardNumberInput">Номер картки:</label>
          <input
            type="text"
            id="creditCardNumberInput"
            name="creditCardNumber"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            required
          />

          <label htmlFor="cvvCodeInput">CVV:</label>
          <input
            type="text"
            id="cvvCodeInput"
            name="cvvCode"
            value={cvvCode}
            onChange={(e) => setCvvCode(e.target.value)}
            required
          />

          <label htmlFor="expirationDateInput">Термін дії:</label>
          <input
            type="text"
            id="expirationDateInput"
            name="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />

          <button type="submit" className="submit-button-check">Замовити</button>
        </form>
      )}

      {step === 4 && (
        <div className="thank-you">
          <h2>Дякуємо за замовлення</h2>
          <p>Очікуйте повідомлення про відправлення</p>
        </div>
      )}
    </main>
  );
}

export default CheckoutPage;
