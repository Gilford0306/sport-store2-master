import React, { useState } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7000/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          birthdate: birthdate,
          phone: phone,
          role: 'User',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      setMessage('Реєстрація пройшла успішно! Тепер можешь увійти в аккаунт...');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Пауза 2 секунды перед перенаправлением
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Помилка реєстрації. Спробуйте ще раз.');
    }
  };

  return (
    <div className="registration-page">
      <div className="header">
        <h1>Тепер давай зареєструємо тебе у ...</h1>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group-sing">
          <label htmlFor="email">Email*</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group-sing">
          <label htmlFor="phone">Телефон*</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group-sing">
          <label htmlFor="login">Login*</label>
          <input
            type="text"
            id="login"
            name="login"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-group-sing">
          <label htmlFor="firstName">Ім'я*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group-sing">
          <label htmlFor="lastName">Прізвище*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group-sing">
          <label htmlFor="password">Пароль*</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="helper-text">Мінімум символів: 8</span>
        </div>
        <div className="form-group-sing">
          <label htmlFor="birthdate">Дата народження*</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
          />
          <label htmlFor="subscribe">Підписатися на розсилку...</label>
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label htmlFor="terms">
            Я приймаю <Link to="/privacy-policy">Політику конфіденційності</Link> та <Link to="/terms-of-uses">Умови використання</Link>.
          </label>
        </div>
        <button type="submit" className="submit-button">Створити аккаунт</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SignupPage;
