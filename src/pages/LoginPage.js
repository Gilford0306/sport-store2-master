import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
import { useFavorites } from "../components/contexts/FavoritesContext";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: loginContext } = useContext(UserContext);
  const { setUser } = useFavorites();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7000/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username: login, Password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Получаем профиль пользователя
      const profileResponse = await fetch(
        "https://localhost:7000/api/Auth/GetProfile",
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
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileResponse.json();
      loginContext(profileData, data.token, data.refreshToken); // Передаем правильные параметры

      // Устанавливаем ID пользователя в контексте избранных товаров
      setUser(profileData.id);
      localStorage.setItem("userId", profileData.id);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
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
