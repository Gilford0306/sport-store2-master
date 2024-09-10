import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../components/contexts/ProductContext";
import { useFavorites } from "../components/contexts/FavoritesContext";
import { useCart } from "../components/contexts/CartContext";
import { useUser } from "../components/contexts/UserContext";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import "./StorePage.css";
import "./ProductPage.css";

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useProducts();
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userProfile } = useUser();
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const product = products.find((p) => p.id === parseInt(productId));

  useEffect(() => {
    if (product) {
      setCurrentImage(product.image); 
    }
  }, [productId, product]); 

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleFavoriteClick = () => {
    if (!userProfile) {
      navigate("/login");
      return;
    }

    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = () => {
    if (!userProfile) {
      navigate("/login");
      return;
    }

    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-page-one">
      <div className="product-content">
        <div className="product-image-section">
          <img
            src={currentImage}
            alt={product.name}
            className="main-image"
          />
          <div className="additional-images">
            {product.images.slice(0, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Additional ${index + 1}`}
                className="additional-image"
                onClick={() => setCurrentImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="product-details-section">
          <h1>{product.name}</h1>
          <p className="product-price">{product.price} грн</p>

          <div className="product-size-selector">
            <p>Виберіть Розмір</p>
            <div className="size-options">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button
              className={`add-to-cart-button ${
                cartItems.some((item) => item.id === product.id)
                  ? "in-cart"
                  : ""
              }`}
              onClick={handleAddToCart}
            >
              {cartItems.some((item) => item.id === product.id)
                ? "Видалити з кошика"
                : "Додати в кошик"}
            </button>
            <button
              className={`favorite-button ${
                isFavorite(product.id) ? "selected" : ""
              }`}
              onClick={handleFavoriteClick}
            >
              {isFavorite(product.id)
                ? "Видалити з обраного"
                : "Додати до обраного"}
            </button>
          </div>

          <div className="product-description-product">
            <h3>Опис</h3>
            <p>{product.full_description}</p>
          </div>
        </div>
      </div>

      <div className="related-products-container">
        <RelatedProducts products={products} currentProductId={product.id} />
      </div>
    </div>
  );
}

export default ProductPage;
