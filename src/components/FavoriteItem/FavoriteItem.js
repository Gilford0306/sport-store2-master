import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import ProductImage from "../ProductImage/ProductImage";
import ProductDescription from "../ProductDescription/ProductDescription";

function FavoriteItem({ item, onRemove }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/product/${item.id}`);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  return (
    <div
      className="favorite-item"
      onClick={handleItemClick}
      style={{ cursor: "pointer" }}
    >
      <IconButton icon="heart" size="37px" color="red" />
      <ProductImage src={item.image} alt={item.name} />
      <ProductDescription
        name={item.name}
        gender={item.gender}
        subcategory={item.subcategory}
        description={item.description}
      />
      <div className="item-price">
        <p>Ціна</p> {item.price}
      </div>
      <IconButton
        icon="trash"
        size="20px"
        color="gray"
        onClick={handleRemoveClick}
      />
    </div>
  );
}

export default FavoriteItem;
