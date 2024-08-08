// ProductImage.js
import React from 'react';


function ProductImage({ src, alt }) {
  return <img className="product-image" src={src} alt={alt} />;
}

export default ProductImage;
