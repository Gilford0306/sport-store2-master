// BestSellers.js
import React from 'react';

function BestSellers() {
  return (
    <section className="best-sellers">
      <h2>ХІТ ПРОДАЖУ</h2>
      <div className="products">
        <div className="product-card">
          <img src="path/to/product1.jpg" alt="Product 1" />
          <button>Детальніше</button>
        </div>
        <div className="product-card">
          <img src="path/to/product2.jpg" alt="Product 2" />
          <button>Детальніше</button>
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
