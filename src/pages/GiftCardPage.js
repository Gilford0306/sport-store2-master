import React, { useState } from 'react';
import GiftCard from '../components/GiftCard/GiftCard';
import './GiftCardPage.css';


const GiftCardPage = () => {
  return (
    <div className="gift-card-page">
      <div className="header-section">
        <h2>Подарункова карта ...... доповнить ваш образ</h2>
        <div className="gift-card-container">
          <GiftCard 
            imgSrc="url-to-image" 
            altText="Подарочная карта" 
          />
          <div className="buttons">
            <button className="send-card-button">Надіслати подарункову картку</button>
            <button className="email-card-button">Подарункова картка ел.поштою</button>
          </div>
        </div>
      </div>
      <div className="styles-section">
        <h3>Інші стилі карток:</h3>
        <div className="other-cards">
          <GiftCard imgSrc="url-to-image1" altText="Card Style 1" />
          <GiftCard imgSrc="url-to-image2" altText="Card Style 2" />
          <GiftCard imgSrc="url-to-image3" altText="Card Style 3" />
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;
