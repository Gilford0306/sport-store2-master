import React, { useState, useContext } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import defaultPhoto from '../components/assets/Ellipse9.png'; 
import { UserContext } from '../components/contexts/UserContext';
import API_BASE_URL from "../services/api";

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
  const { login: loginContext } = useContext(UserContext); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Шаг 1: Регистрация пользователя
      const registrationResponse = await fetch(`${API_BASE_URL}/Auth/register`, {
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

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        console.error('Registration error:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      // Шаг 2: Автоматический логин после успешной регистрации
      const loginResponse = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: login, Password: password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.message || 'Failed to log in');
      }

      const loginData = await loginResponse.json();
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('refreshToken', loginData.refreshToken);

      // Шаг 3: Получение профиля пользователя и сохранение в контексте
      const profileResponse = await fetch(`${API_BASE_URL}/Auth/GetProfile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });

      if (!profileResponse.ok) {
        const errorProfileData = await profileResponse.json();
        console.error('Failed to fetch profile:', errorProfileData);
        throw new Error('Failed to fetch profile');
      }

      const profileData = await profileResponse.json();
      loginContext(profileData, loginData.token, loginData.refreshToken);

      // Шаг 4: Загрузка дефолтного фото после успешного логина
      const formData = new FormData();
      const response = await fetch(defaultPhoto);
      const blob = await response.blob();
      formData.append('file', blob, 'defaultPhoto.png');

      const photoUploadResponse = await fetch(`${API_BASE_URL}/Auth/UploadProfilePhoto`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
        body: formData,
      });

      if (!photoUploadResponse.ok) {
        throw new Error('Failed to upload profile photo');
      }

      setMessage('Реєстрація пройшла успішно! Тепер перенаправимо Вас на головну сторінку...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
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
        {/* Форма регистрации */}
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
