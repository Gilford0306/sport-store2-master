import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './RelatedProducts.css';

function RelatedProducts({ products, currentProductId }) {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    const availableProducts = products.filter(product => product.isAvailable && product.id !== currentProductId);
    
    function getRandomProducts(products, count) {
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    setRelatedProducts(getRandomProducts(availableProducts, 4));
  }, [products, currentProductId]);

  return (
    <div className="related-products">
      <h2 className="related-products-title">Вам також може сподобатися</h2>
      <div className="related-products-list">
        {relatedProducts.map(product => (
          <div 
            key={product.id} 
            className="related-products-item" 
            onClick={() => navigate(`/product/${product.id}`)} 
          >
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price} грн</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
