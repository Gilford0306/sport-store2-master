import React from 'react';


const GiftCard = ({ imgSrc, altText }) => {
  return (
    <div className="gift-card">
      <img src={imgSrc} alt={altText} className="card-image" />
    </div>
  );
};

export default GiftCard;
