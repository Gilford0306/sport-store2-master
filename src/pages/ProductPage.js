import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Используем useNavigate для навигации
import { useProducts } from "../components/contexts/ProductContext";
import { useFavorites } from "../components/contexts/FavoritesContext";
import { useCart } from "../components/contexts/CartContext";
import { useUser } from "../components/contexts/UserContext"; // Используем UserContext
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import "./StorePage.css";
import "./ProductPage.css";

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate(); // Инициализируем useNavigate
  const products = useProducts();
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userProfile } = useUser(); // Получаем данные о пользователе из UserContext
  const [selectedSize, setSelectedSize] = useState(null);

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleFavoriteClick = () => {
    if (!userProfile) {
      navigate("/login"); // Перенаправляем на страницу логина, если пользователь не авторизован
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
      navigate("/login"); // Перенаправляем на страницу логина, если пользователь не авторизован
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
          <img src={product.image} alt={product.name} />
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