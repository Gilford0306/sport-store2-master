import React , { useState } from 'react';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom';


function LoginPage  ()  {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7000/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Сохранение токенов в localStorage или куда-то еще
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    } else {
      // Обработка ошибок
      console.error(data);
    }
  };
    return (
        <div className="email-input-container">
         <form onSubmit={handleLogin}>
            <h2>Вкажіть адресу електронної пошти та пароль щоб увійти .</h2>
            <input type="email" placeholder="Ел. пошта" className="email-input"  id="email" name="email" required value={email} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" className="email-input" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="button-container">
               <button type="submit">Продовжити</button>
               
            </div>
         </form>

        </div>
    );
};
export default LoginPage;


