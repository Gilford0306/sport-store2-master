import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ProductCategories from "../components/Home/ProductCategories";
import BestSellers from "../components/Home/BestSellers";
import Header from "../components/Header/Header";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Button from "../components/Button/Button";
import heroImage from "../components/assets/hero-image-copy.jpg";
import "./HomePage.css";
import magtop1 from "../components/assets/Frame 80.svg";
import magtop2 from "../components/assets/Frame 81.svg";
import magtop3 from "../components/assets/Frame 82.svg";
import clothingImage from "../components/assets/Clothing.jpg"; // путь к изображению одежды
import footwearImage from "../components/assets/Footwear.jpg"; // путь к изображению обуви
import accessoriesImage from "../components/assets/Accessories.jpg"; // путь к изображению аксессуаров
import Frame1 from "../components/assets/store/Frame1.png";
import Frame2 from "../components/assets/store/Frame2.png";
import Frame3 from "../components/assets/store/Frame3.png";
import Frame4 from "../components/assets/store/Frame4.png";
import Frame5 from "../components/assets/store/Frame5.png";
import Frame6 from "../components/assets/store/Frame6.png";

const images = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6];

function HomePage() {
  return (
    <div>
      <div className="header-image-container">
        <div className="text-overlay"></div>
        <img src={heroImage} alt="Cyclist" className="cyclist-image" />
        <div className="text-overlay">
          <h1>Твоя перемога ближче, ніж здається!</h1>
          <p>Знижка до 70% на весь асортимент спортивних товарів!</p>
        </div>
        <a href="/store">
          <img src={magtop1} alt="magtop" className="magtop1" />
        </a>
        <a href="/store">
          <img src={magtop2} alt="magtop" className="magtop2" />{" "}
        </a>
        <a href="/store">
          <img src={magtop3} alt="magtop" className="magtop3" />
        </a>
      </div>

      <div className="middle-section">
        <h2>РУХАЙСЯ</h2>
        <p>до мети з комфортом!</p>
        <div className="images-container">
          <div className="image-box">
            <img src={clothingImage} alt="Clothing" />
            <p className="image-with-text">ОДЯГ</p>
            <a href="/store">
              <button className="shop-button-middle">Магазин</button>
            </a>
          </div>
          <div className="image-box">
            <img src={footwearImage} alt="Footwear" />
            <p>ВЗУТТЯ</p>
            <a href="/store">
              <button className="shop-button-middle">Магазин</button>
            </a>
          </div>
          <div className="image-box">
            <img src={accessoriesImage} alt="Accessories" />
            <p>АКСЕСУАРИ</p>
            <a href="/store">
              <button className="shop-button-middle">Магазин</button>
            </a>
          </div>
        </div>
      </div>
      <div className="hit-prodagy">
        <h1>Хит продажу</h1>
        <div className="product-container">
          {images.map((image, index) => (
            <div key={index} className="product-card-best">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="product-image-best"
              />
              <a href="/store">
                <button className="shop-button-best">Магазин</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
