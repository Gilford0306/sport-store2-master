import React, { useState, useEffect } from 'react';
import './Header.css'; 
import logo from '../assets/Group 181.svg';
import { Link } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from '../Button/Button';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://localhost:7000/api/Auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.ok) {
            setUserProfile(data);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

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
            <UserProfile name={userProfile.username} />
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
