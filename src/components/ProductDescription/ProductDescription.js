// ProductDescription.js
import React from "react";

function ProductDescription({ name, gender, subcategory, description }) {
  return (
    <div className="product-description">
      <h3>{name}</h3>
      <p>{gender}</p>
      <p>{subcategory}</p>
      <p>{description}</p>
    </div>
  );
}

export default ProductDescription;
