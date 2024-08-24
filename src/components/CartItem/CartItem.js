import React from "react";
import { useNavigate } from "react-router-dom"; // Убедитесь, что импортировали useNavigate
import { useCart } from "../contexts/CartContext";
import IconButton from "../IconButton/IconButton";
import ProductImage from "../ProductImage/ProductImage";
import ProductDescription from "../ProductDescription/ProductDescription";
import "./CartItem.css";

function CartItem({ item }) {
  const { removeFromCart, updateItemChecked, selectedItems } = useCart();
  const navigate = useNavigate(); // Инициализируйте navigate

  // Определите состояние чекбокса
  const [isChecked, setIsChecked] = React.useState(
    selectedItems.some((selectedItem) => selectedItem.id === item.id)
  );

  // Обновление состояния чекбокса при изменении selectedItems
  React.useEffect(() => {
    setIsChecked(
      selectedItems.some((selectedItem) => selectedItem.id === item.id)
    );
  }, [selectedItems, item.id]);

  // Функция для удаления товара
  const handleRemove = () => {
    removeFromCart(item.id);
    if (isChecked) {
      updateItemChecked(item.id, false);
    }
  };

  // Функция для изменения состояния чекбокса
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    updateItemChecked(item.id, newCheckedState);
  };

  // Функция для обработки клика на описание товара
  const handleDescriptionClick = (event) => {
    event.stopPropagation();
    navigate(`/product/${item.id}`); // Используйте navigate для перехода
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-checkbox">
          <input
            type="checkbox"
            id={`checkbox-${item.id}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox-${item.id}`}></label>
        </div>
        <ProductImage
          src={item.image}
          alt={item.name}
          className="product-image"
        />
        <div className="product-description" onClick={handleDescriptionClick}>
          <ProductDescription
            name={item.name}
            gender={item.gender}
            subcategory={item.subcategory}
            description={item.brand}
          />
        </div>
      </div>
      <div className="item-price">
        <p className="price-label">Ціна</p>
        <p className="price-value">{item.price} грн</p>
      </div>
      <IconButton
        color="grey"
        icon="trash"
        size="20px"
        onClick={(e) => {
          e.stopPropagation(); // Предотвращаем всплытие события клика
          handleRemove();
        }}
      />
    </div>
  );
}

export default CartItem;
