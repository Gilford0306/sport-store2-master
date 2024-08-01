import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>РЕСУРСИ</h3>
          <ul>
            <li><a href="#">Подарункові картки</a></li>
            <li><a href="#">Знайти магазин</a></li>
            <li><a href="#">Стати учасником</a></li>
            <li><a href="#">Зворотний зв'язок сайту</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>ДОПОМОГА</h3>
          <ul>
            <li><a href="#">Отримати допомогу</a></li>
            <li><a href="#">Статус замовлення</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Повернення</a></li>
            <li><a href="#">Скасування замовлення</a></li>
            <li><a href="#">Варіанти оплати</a></li>
            <li><a href="#">Баланс подарункової картки</a></li>
            <li><a href="#">Зв'язатися з нами</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>КОМПАНІЯ</h3>
          <ul>
            <li><a href="#">Про компанію ...</a></li>
            <li><a href="#">Новини</a></li>
            <li><a href="#">Кар'єра</a></li>
            <li><a href="#">Інвестори</a></li>
            <li><a href="#">Призначення</a></li>
            <li><a href="#">Стійкість</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>АКЦІЇ ТА ЗНИЖКИ</h3>
          <ul>
            <li><a href="#">Студент</a></li>
            <li><a href="#">Військовий</a></li>
            <li><a href="#">Вчитель</a></li>
            <li><a href="#">Співчуття швидкої допомоги та медичні працівники</a></li>
            <li><a href="#">День народження</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ......, Inc. All Rights Reserved</p>
        <ul className="footer-bottom-links">
          <li><a href="#">Guides</a></li>
          <li><a href="#">Terms of Sale</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Nike Privacy Policy</a></li>
          <li><a href="#">Your Privacy Choices</a></li>
          <li><a href="#">CA Supply Chains Act</a></li>
        </ul>
        <div className="footer-language">
          <span>Україна</span>
        </div>
      </div>
    </footer>
  );
}


export default Footer;