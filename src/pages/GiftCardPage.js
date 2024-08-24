import React from "react";
import GiftCard from "../components/GiftCard/GiftCard";
import Gift1 from "../components/assets/Gift1.png";
import Gift2 from "../components/assets/Gift2.png";
import Gift3 from "../components/assets/Gift3.png";
import "./GiftCardPage.css";

const GiftCardPage = () => {
  return (
    <div className="gift-card-page">
      <div className="header-section">
        <div className="header-gift">
          Подарункова карта ...... доповнить ваш образ
        </div>
        <div className="gift-card-container">
          <div className="buttons-container">
            <button className="send-card-button">
              Надіслати подарункову картку
            </button>
            <button className="email-card-button">
              Подарункова картка ел.поштою
            </button>
          </div>
          <div className="gift1-container">
            <img src={Gift1} alt="Подарочная карта" className="gift1-image" />
          </div>
        </div>
      </div>
      <div className="styles-section">
        <h3>Інші стилі карток:</h3>
        <div className="other-cards-container">
          <div className="other-card">
            <GiftCard imgSrc={Gift1} altText="Card Style 1" />
          </div>
          <div className="other-card">
            <GiftCard imgSrc={Gift2} altText="Card Style 2" />
          </div>
          <div className="other-card">
            <GiftCard imgSrc={Gift3} altText="Card Style 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;
