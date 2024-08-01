import React, { useState } from 'react';
import './Header.css'; 
import logo from '../assets/Group 181.svg';
import { Link } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from '../Button/Button';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="logo">
         <img src={logo} alt="Planet Sports Logo"/>
      </div>
        <NavigationBar />
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <div className="icons">
              <Icon type="heart" />
              <Icon type="cart" />
            </div>
            <UserProfile name="Ім'я Прізвище" />
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

const NavLink = ({ label }) => (
  <a href="#" className="nav-link">
    {label}
  </a>
);

const Icon = ({ type }) => (
  <div className={`icon icon-${type}`}>
    <i className={`fa fa-${type}`} />
  </div>
);

const UserProfile = ({ name }) => (
  <div className="user-profile">
    <span>{name}</span>
    <img src="path/to/profile-picture.jpg" alt="User Profile" />
  </div>
);

export default Header;
