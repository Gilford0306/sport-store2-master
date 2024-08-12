import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

    //   useEffect(() => {
  //   // Fetch products from an API
  //   const fetchProducts = async () => {
  //     const response = await fetch('/api/products');
  //     const data = await response.json();
  //     setProducts(data);
  //   };
    
  //   fetchProducts();
  // }, []);


function ProductList({ products }) {
  console.log(products);
  if (!products || products.length === 0) {
    return <p>No products available.</p>; // Отображение сообщения, если нет продуктов
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
