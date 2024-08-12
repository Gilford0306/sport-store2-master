import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedProducts.css';

function RelatedProducts({ products, currentProductId }) {
  const navigate = useNavigate();

  // Фильтруем продукты, чтобы исключить текущий продукт
  const filteredProducts = products.filter(product => product.id !== currentProductId);

  // Функция для выбора 4 случайных товаров
  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Получаем 4 случайных товара
  const randomProducts = getRandomProducts(filteredProducts, 4);

  return (
    <div className="related-products">
      <h2 className="related-products-title">Вам також може сподобатися</h2>
      <div className="related-products-list">
        {randomProducts.map(product => (
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
