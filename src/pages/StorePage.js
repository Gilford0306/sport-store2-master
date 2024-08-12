import React from 'react';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductList from '../components/ProductList/ProductList';
import './ProductPage.css'; 
import './StorePage.css';

function StorePage({ products }) {
  return (
    <div className="product-page">
      <FilterSidebar />
      <ProductList products={products} />
    </div>
  );
}

export default StorePage;
