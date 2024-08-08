// ProductDescription.js
import React from 'react';


function ProductDescription({ name, description }) {
  return (
    <div className="product-description">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ProductDescription;
