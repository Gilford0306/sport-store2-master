import React from 'react';

function ProductCategories() {
  return (
    <section className="product-categories">
      <h2>РУХАЙСЯ до мети з комфортом!</h2>
      <div className="categories">
        <div className="category">
          <img src="path/to/clothing.jpg" alt="Clothing" />
          <button>ОДЯГ</button>
        </div>
        <div className="category">
          <img src="path/to/shoes.jpg" alt="Shoes" />
          <button>ВЗУТТЯ</button>
        </div>
        <div className="category">
          <img src="path/to/accessories.jpg" alt="Accessories" />
          <button>АКСЕСУАРИ</button>
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
