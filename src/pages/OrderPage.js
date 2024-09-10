import React, { useState } from "react";
import { useCart } from "../components/contexts/CartContext";
import { useUser } from "../components/contexts/UserContext";
import NewPost from "../components/assets/newPost.png";
import UkrPost from "../components/assets/ukrPost.png";
import Mag from "../components/assets/mag.png";
import Box from "../components/assets/box.png";
import "./OrderPage.css";
import API_BASE_URL from "../services/api";

const OrderPage = () => {
  const { selectedItems, clearCart, clearSelectedItems } = useCart();
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

          // Create orders for all items
          const orderResponses = await Promise.all(
            selectedItems.map((item) =>
              fetch(`${API_BASE_URL}/Order/CreateOrder`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  ProductId: item.id,
                  UserId: userId,
                  StatusId: 2,
                  Amount: 1,
                }),
              })
            )
          );

          // Get all created order IDs
          const orderResults = await Promise.all(
            orderResponses.map((res) => res.json())
          );

          console.log("Orders created:", orderResults);

          const updateResponses = await Promise.all(
            selectedItems.map((item) =>
              fetch(`${API_BASE_URL}/Product/UpdateProductWithId${item.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  Id: item.id,
                  SubcathegoryId: item.SubcathegoryId,
                  Name: item.name,
                  CathegoryId: item.CathegoryId,
                  Description: item.description,
                  Price: item.price,
                  Photos: item.photos || [],
                  DiscountId: item.DiscountId,
                  IsAvailable: false,
                  CountryId: item.CountryId,
                  BrandId: item.BrandId,
                  GenderId: item.GenderId,
                  SportId: item.SportId,
                  ColorId: item.ColorId,
                }),
              })
            )
          );
          const updateResults = await Promise.all(
            updateResponses.map((res) => res.json())
          );
          console.log("Products updated:", updateResults);

          const deliveryResponses = await Promise.all(
            orderResults.map((order) =>
              fetch(`${API_BASE_URL}/Delivery/CreateDelivery`, {
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

          clearCart();
          clearSelectedItems();
          setCurrentStep(4); // Move to step 4
        } catch (error) {
          console.error("Error submitting order and delivery:", error);
        }
      } else {
        handleNextStep(); // Move to the next step if cash on delivery is not selected
      }
    } else if (currentStep === 3 && !isCashOnDelivery) {
      try {
        const token = localStorage.getItem("token");

        // Create orders for all items
        const orderResponses = await Promise.all(
          selectedItems.map((item) =>
            fetch(`${API_BASE_URL}/Order/CreateOrder`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ProductId: item.id,
                UserId: userId,
                StatusId: 2,
                Amount: 1,
              }),
            })
          )
        );

        const orderResults = await Promise.all(
          orderResponses.map((res) => res.json())
        );

        console.log("Orders created:", orderResults);

        const updateResponses = await Promise.all(
          selectedItems.map((item) =>
            fetch(`${API_BASE_URL}/Product/UpdateProductWithId${item.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Id: item.id,
                SubcathegoryId: item.SubcathegoryId,
                Name: item.name,
                CathegoryId: item.CathegoryId,
                Description: item.description,
                Price: item.price,
                Photos: item.photos || [],
                DiscountId: item.DiscountId,
                IsAvailable: false,
                CountryId: item.CountryId,
                BrandId: item.BrandId,
                GenderId: item.GenderId,
                SportId: item.SportId,
                ColorId: item.ColorId,
              }),
            })
          )
        );
        const updateResults = await Promise.all(
          updateResponses.map((res) => res.json())
        );
        console.log("Products updated:", updateResults);

        const deliveryResponses = await Promise.all(
          orderResults.map((order) =>
            fetch(`${API_BASE_URL}/Delivery/CreateDelivery`, {
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
        clearCart();
        clearSelectedItems();
        console.log("clearCart:", selectedItems);
        handleNextStep(); // Move to the next step
      } catch (error) {
        console.error("Error submitting order and delivery:", error);
      }
    } else if (currentStep === 4) {
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="order-page">
      <h1>Оформлення замовлення</h1>

      {currentStep === 1 && (
        <div className="order-content">
          <form
            className="user-data-form order-page-inputs "
            onSubmit={handleSubmit}
          >
            <h2>Введіть ваші данні</h2>
            <div className="form-group-order">
              <input
                type="text"
                name="name"
                placeholder="Ім'я"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
              <input
                type="text"
                name="surname"
                placeholder="Прізвище"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
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
              <div className="option-group order-page-inputs ">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="store"
                    checked={formData.deliveryOption === "store"}
                    onChange={handleInputChange}
                  />
                  Доставка в магазин
                  <img src={Mag} alt="магазин" className="post-icon" />
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="department"
                    checked={formData.deliveryOption === "department"}
                    onChange={handleInputChange}
                  />
                  Доставка у відділення
                  <img src={Box} alt="коробка" className="post-icon" />
                </label>
              </div>

              {formData.deliveryOption === "department" && (
                <>
                  <div className="option-group">
                    <label className="radio-label post">
                      <input
                        type="radio"
                        name="deliveryService"
                        value="nova"
                        checked={formData.deliveryService === "nova"}
                        onChange={handleInputChange}
                      />
                      Нова пошта
                      <img
                        src={NewPost}
                        alt="Нова пошта"
                        className="post-icon"
                      />
                    </label>
                    <label className="radio-label post">
                      <input
                        type="radio"
                        name="deliveryService"
                        value="ukr"
                        checked={formData.deliveryService === "ukr"}
                        onChange={handleInputChange}
                      />
                      Укр пошта
                      <img
                        src={UkrPost}
                        alt="Укр пошта"
                        className="post-icon"
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="option-group order-page-inputs ">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="paymentOption"
                    checked={isCashOnDelivery}
                    onChange={handleCheckboxChange}
                  />
                  Оплата при отриманні
                </label>
              </div>

              <div className="address-group order-page-inputs ">
                <input
                  type="text"
                  name="address"
                  placeholder="Місто та адреса"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {formData.deliveryOption === "department" ? (
                  <input
                    type="text"
                    name="departmentNumber"
                    placeholder="Номер відділення"
                    value={formData.departmentNumber}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : (
                  <input
                    type="text"
                    name="additionalInfo"
                    placeholder="Додатково"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                )}
                <input
                  type="text"
                  name="country"
                  placeholder="Країна"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Поштовий індекс"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>
            <button type="submit" className="submit-form-order">
              Замовити
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
            <div className="form-group-order-inline order-page-inputs">
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
            <div className="form-group-order order-page-inputs">
              <input
                type="text"
                name="cardNumber"
                placeholder="Номер картки"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
              <input
                type="text"
                name="cw2"
                placeholder="CW2"
                value={formData.cw2}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
              <input
                type="text"
                name="expiryDate"
                placeholder="Термін дії картки"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-order order-page-inputs">
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
