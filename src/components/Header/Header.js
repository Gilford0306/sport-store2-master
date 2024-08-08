import React, { useState, useEffect } from 'react';
import './Header.css'; 
import logo from '../assets/Logo-05.png';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from '../Button/Button';
import group164 from '../assets/Group 164.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // fetch('https://localhost:7000/api/Auth/profile', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data && data.ok) {
      //       setUserProfile(data);
      //       setIsLoggedIn(true);
      //     } else {
      //       setIsLoggedIn(false);
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error fetching profile:', error);
      //     setIsLoggedIn(false);
      //   });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Planet Sports Logo" />
      </div>
      <NavigationBar />
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <div className="icons">
              <Icon type="heart" onClick={() => handleIconClick('/favorite')} />
              <Icon type="shopping-cart" onClick={() => handleIconClick('/cart')} />
            </div>
            {/* <UserProfile name={userProfile.username} /> */}
            <img src={group164} alt="Logged In User" className="profile-img" onClick={handleProfileClick} />
            <button onClick={handleLogout}>Выйти</button> 
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
