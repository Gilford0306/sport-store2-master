import React, { useState, useContext } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/contexts/UserContext';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:7000/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: login, Password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Получаем профиль пользователя
      const profileResponse = await fetch('https://localhost:7000/api/Auth/GetProfile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!profileResponse.ok) {
        const errorProfileData = await profileResponse.json();
        console.error('Failed to fetch profile:', errorProfileData);
        throw new Error('Failed to fetch profile');
      }

      const profileData = await profileResponse.json();
      loginContext(profileData);
      console.log('UserProfile:', profileData);
      navigate('/');
    } 
    catch (error) {
      console.error('Login failed:', error);
      // Возможно, показать пользователю сообщение об ошибке
    }
  };

  return (
    <div className="email-input-container">
      <form onSubmit={handleLogin}>
        <h2>Вкажіть адресу електронної пошти та пароль щоб увійти.</h2>
        <input
          type="text"
          placeholder="Логін"
          className="email-input"
          id="login"
          name="login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="email-input"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button type="submit">Продовжити</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
