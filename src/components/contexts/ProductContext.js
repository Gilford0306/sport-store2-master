import React, { createContext, useContext } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children, products }) {
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}