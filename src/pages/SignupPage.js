import React from 'react';
import './SignupPage.css';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button'


function SignupPage() {
  return (
    <div className="registration-page">
      <div className="header">
        <h1>Тепер давай зареєструємо тебе у ...</h1>
      </div>
      <form className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="login">Login*</label>
          <input type="text" id="login" name="login" required />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Ім'я*</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Прізвище*</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль*</label>
          <input type="password" id="password" name="password" required />
          <span className="helper-text">Мінімум символів: 8</span>
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Дата народження*</label>
          <input type="date" id="birthdate" name="birthdate" required />
        </div>
        <div className="form-group checkbox-group">
         <input type="checkbox" id="subscribe" name="subscribe" />
         <label htmlFor="subscribe">
         Підписатися на розсилку...
         </label>
       </div>
        <div className="form-group checkbox-group">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">
            Я приймаю <a><Link to="/privacy-policy">Політику конфіденційності</Link></a> та  <a><Link to={"/terms-of-uses"}> Умови використання</Link></a>.
          </label>
        </div>
        <button type="submit" className="submit-button">Створити аккаунт</button>
      </form>
    </div>
  );
}


export default SignupPage;

