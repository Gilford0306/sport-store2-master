import React, { useEffect, useRef } from "react";

import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";



function ProductList({ products }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [products]);

  if (!products || products.length === 0) {
    return <p>No products available.</p>; // Отображение сообщения, если нет продуктов
  }

  return (
    <div className="product-list" ref={listRef}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
