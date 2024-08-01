import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ color, text, href }) => {
  return (
    <Link to={href} className={`button ${color}`}>
      {text}
    </Link>
  );
};

export default Button;
