import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
import { useFavorites } from "../components/contexts/FavoritesContext";
import API_BASE_URL from "../services/api";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Новое состояние для сообщения об ошибке
  const navigate = useNavigate();
  const { login: loginContext } = useContext(UserContext);
  const { setUser } = useFavorites();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Очистить сообщение об ошибке перед новой попыткой

    try {
      const response = await fetch( `${API_BASE_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username: login, Password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        setErrorMessage("Невірний логін або пароль"); // Устанавливаем сообщение об ошибке
        return; // Останавливаем выполнение, если запрос не удался
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Получаем профиль пользователя
      const profileResponse = await fetch(
        `${API_BASE_URL}/Auth/GetProfile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!profileResponse.ok) {
        const errorProfileData = await profileResponse.json();
        console.error("Failed to fetch profile:", errorProfileData);
        setErrorMessage("Не вдалося отримати профіль користувача");
        return;
      }

      const profileData = await profileResponse.json();
      loginContext(profileData, data.token, data.refreshToken); // Передаем правильные параметры

      // Устанавливаем ID пользователя в контексте избранных товаров
      setUser(profileData.id);
      localStorage.setItem("userId", profileData.id);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Помилка при вході"); // Обработка ошибки при запросе
    }
  };

  return (
    <div className="email-input-container">
      <form onSubmit={handleLogin}>
        <h2>Вкажіть адресу електронної пошти та пароль щоб увійти.</h2>
        <input
          type="text"
          placeholder="Логін"
          className="email-input-login"
          id="login"
          name="login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="email-input-login"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>} 

        <div className="button-container">
          <button type="submit" className="continue-button">
            Продовжити
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
