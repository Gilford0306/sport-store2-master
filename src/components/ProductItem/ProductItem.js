import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

function ProductItem({ product }) {
  if (!product) {
    return <p>Product not found.</p>;
  }
  
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} грн</p>

      <Link to={`/product/${product.id}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
}

export default ProductItem;