import React from "react";
import "./Footer.css";
import { FaGlobe } from "react-icons/fa"; // Импортируем иконку планеты из react-icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>РЕСУРСИ</h3>
          <ul>
            <li>
              <a href="/gift">Подарункові картки</a>
            </li>
            <li>
              <a href="/map">Знайти магазин</a>
            </li>
            <li>
              <a href="/login">Стати учасником</a>
            </li>
            <li>
              <a href="/help">Зворотний зв'язок сайту</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>ДОПОМОГА</h3>
          <ul>
            <li>
              <a href="/help">Отримати допомогу</a>
            </li>
            <li>
              <a href="#">Статус замовлення</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
            <li>
              <a href="#">Повернення</a>
            </li>
            <li>
              <a href="#">Скасування замовлення</a>
            </li>
            <li>
              <a href="#">Варіанти оплати</a>
            </li>
            <li>
              <a href="#">Баланс подарункової картки</a>
            </li>
            <li>
              <a href="/help#">Зв'язатися з нами</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>КОМПАНІЯ</h3>
          <ul>
            <li>
              <a href="#">Про компанію ...</a>
            </li>
            <li>
              <a href="#">Новини</a>
            </li>
            <li>
              <a href="#">Кар'єра</a>
            </li>
            <li>
              <a href="#">Інвестори</a>
            </li>
            <li>
              <a href="#">Призначення</a>
            </li>
            <li>
              <a href="#">Стійкість</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>АКЦІЇ ТА ЗНИЖКИ</h3>
          <ul>
            <li>
              <a href="#">Студент</a>
            </li>
            <li>
              <a href="#">Військовий</a>
            </li>
            <li>
              <a href="#">Вчитель</a>
            </li>
            <li>
              <a href="#">Співчуття швидкої допомоги та медичні працівники</a>
            </li>
            <li>
              <a href="#">День народження</a>
            </li>
          </ul>
        </div>
        {/* Новый столбец для иконки и текста */}
        <div className="footer-column footer-language-column">
          <div className="footer-language-content">
            <FaGlobe className="footer-icon" />
            <span className="footer-language-text">Україна</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom-foot">
        <ul className="footer-bottom-links">
          <li> © 2024 Planet Sport Inc. Усі права захищено </li>
          <li>
            <a href="#">Посібники</a>
          </li>
          <li>
            <a href="#">Умови продажу</a>
          </li>
          <li>
            <a href="/terms-of-uses">Умови використання </a>
          </li>
          <li>
            <a href="/privacy-policy">Політика конфіденційності</a>
          </li>
          <li>
            <a href="#">Ваш вибір конфіденційності </a>
          </li>
          <li>
            <a href="#">Закон CA про ланцюги поставок</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
