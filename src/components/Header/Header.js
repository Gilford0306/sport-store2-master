import React, { useContext } from "react";
import "./Header.css";
import logo from "../assets/Logo-05.png";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from "../Button/Button";
import group164 from "../assets/Group 164.png";
import { UserContext } from "../contexts/UserContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const { userProfile, logout } = useContext(UserContext);
  const { clearFavorites } = useFavorites();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId"); // Удаляем userId из localStorage
    clearFavorites(); // Очищаем избранные товары
    clearCart();
    logout();
    navigate("/login");
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Planet Sports Logo" />
      </div>
      <NavigationBar />
      <div className="header-right">
        {userProfile ? (
          <>
            <div className="icons">
              <Icon type="heart" onClick={() => handleIconClick("/favorite")} />
              <Icon
                type="shopping-cart"
                onClick={() => handleIconClick("/cart")}
              />
            </div>
            <div className="user-profile" onClick={handleProfileClick}>
              <img src={group164} alt="User" className="profile-img" />
              <span className="user-name">
                {userProfile.username || "User"}
              </span>
            </div>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <>
            <Button color="yellow" text="Вхід" href="/login" />
            <Button color="blue" text="Зареєструватися" href="/signup" />
          </>
        )}
      </div>
    </header>
  );
};

const Icon = ({ type, onClick }) => (
  <div className={`icon icon-${type}`} onClick={onClick}>
    <i className={`fa fa-${type}`} />
  </div>
);

export default Header;
