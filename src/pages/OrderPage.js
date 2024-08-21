import React, { useState } from "react";
import { useCart } from "../components/contexts/CartContext";
import { useUser } from "../components/contexts/UserContext";
import "./OrderPage.css";

const OrderPage = () => {
  const { selectedItems, clearCart } = useCart();
  const { userId } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    deliveryOption: "",
    address: "",
    additionalInfo: "",
    country: "",
    postalCode: "",
    paymentMethod: "",
    cardNumber: "",
    cw2: "",
    expiryDate: "",
    billingAddress: "",
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleCheckboxChange = () => {
    setIsCashOnDelivery(!isCashOnDelivery);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 2) {
      if (isCashOnDelivery) {
        try {
          const token = localStorage.getItem("token");

          // Создайте заказы для всех товаров
          const orderResponses = await Promise.all(
            selectedItems.map((item) =>
              fetch("https://localhost:7000/api/Order/CreateOrder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  ProductId: item.id,
                  UserId: userId,
                  StatusId: 1,
                  Amount: 1,
                }),
              })
            )
          );

          // Получите все ID созданных заказов
          const orderResults = await Promise.all(
            orderResponses.map((res) => res.json())
          );

          console.log("Orders created:", orderResults);

          // Создайте доставку для каждого заказа
          const deliveryResponses = await Promise.all(
            orderResults.map((order) =>
              fetch("https://localhost:7000/api/Delivery/CreateDelivery", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  OrderId: order.id,
                  Address: formData.address,
                  Additionally: formData.additionalInfo,
                  Date: new Date().toISOString(),
                }),
              })
            )
          );

          const deliveryResults = await Promise.all(
            deliveryResponses.map((res) => res.json())
          );

          console.log("Deliveries created:", deliveryResults);

          setCurrentStep(4); // Переход к шагу 4
        } catch (error) {
          console.error("Error submitting order and delivery:", error);
        }
      } else {
        handleNextStep(); // Переход к следующему шагу, если оплата при получении не выбрана
      }
    } else if (currentStep === 3 && !isCashOnDelivery) {
      try {
        const token = localStorage.getItem("token");

        // Создайте заказы для всех товаров
        const orderResponses = await Promise.all(
          selectedItems.map((item) =>
            fetch("https://localhost:7000/api/Order/CreateOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ProductId: item.id,
                UserId: userId,
                StatusId: 1,
                Amount: 1,
              }),
            })
          )
        );

        // Получите все ID созданных заказов
        const orderResults = await Promise.all(
          orderResponses.map((res) => res.json())
        );

        console.log("Orders created:", orderResults);

        // Создайте доставку для каждого заказа
        const deliveryResponses = await Promise.all(
          orderResults.map((order) =>
            fetch("https://localhost:7000/api/Delivery/CreateDelivery", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: order.Id,
                statusId: order.StatusId,
                Address: formData.address,
                Additionally: formData.additionalInfo,
                Date: new Date().toISOString(),
              }),
            })
          )
        );

        const deliveryResults = await Promise.all(
          deliveryResponses.map((res) => res.json())
        );

        console.log("Deliveries created:", deliveryResults);

        handleNextStep(); // Переход к следующему шагу
      } catch (error) {
        console.error("Error submitting order and delivery:", error);
      }
    } else if (currentStep === 4) {
      // Очистка корзины после завершения шага 4
      clearCart();
    } else {
      handleNextStep(); // Переход к следующему шагу в других случаях
    }
  };

  return (
    <div className="order-page">
      <h1>Оформлення замовлення</h1>

      {currentStep === 1 && (
        <div className="order-content">
          <form className="user-data-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ім'я"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="surname"
                placeholder="Прізвище"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Номер телефону"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-form">
              Продовжити
            </button>
          </form>
          <div className="selected-items">
            <h2>Обрані товари</h2>
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <div className="item" key={item.id}>
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.price} грн.</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Ви не обрали жодних товарів.</p>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="order-content">
          <form className="order-form" onSubmit={handleSubmit}>
            <div className="delivery-options">
              <h2>Варіанти доставки</h2>
              <div className="option-group">
                <label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="store"
                    checked={formData.deliveryOption === "store"}
                    onChange={handleInputChange}
                  />
                  Доставка в магазин
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="department"
                    checked={formData.deliveryOption === "department"}
                    onChange={handleInputChange}
                  />
                  Доставка у відділення
                </label>
              </div>

              <div className="option-group">
                <label>
                  <input
                    type="checkbox"
                    name="paymentOption"
                    checked={isCashOnDelivery}
                    onChange={handleCheckboxChange}
                  />
                  Оплата при отриманні
                </label>
              </div>

              <div className="address-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Місто та адреса"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="additionalInfo"
                  placeholder="Додатково"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Країна"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Поштовий індекс"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="submit-form">
              Продовжити
            </button>
          </form>
          <div className="selected-items">
            <h2>Обрані товари</h2>
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <div className="item" key={item.id}>
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.price} грн.</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Ви не обрали жодних товарів.</p>
            )}
          </div>
        </div>
      )}

      {currentStep === 3 && !isCashOnDelivery && (
        <div className="centered-content">
          <form className="payment-form" onSubmit={handleSubmit}>
            <h2>Оформлення замовлення</h2>
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="visa"
                  checked={formData.paymentMethod === "visa"}
                  onChange={handleInputChange}
                />
                Visa
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mastercard"
                  checked={formData.paymentMethod === "mastercard"}
                  onChange={handleInputChange}
                />
                MasterCard
              </label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cardNumber"
                placeholder="Номер картки"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cw2"
                placeholder="CW2"
                value={formData.cw2}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="expiryDate"
                placeholder="Термін дії картки"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="billingAddress"
                placeholder="Розрахункова адреса"
                value={formData.billingAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-form">
              Замовити
            </button>
          </form>
        </div>
      )}

      {currentStep === 4 && (
        <div className="centered-content">
          <h2>Дякуємо за замовлення</h2>
          <p>Очікуйте повідомлення про відправлення.</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
