import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import ProductCategories from '../components/Home/ProductCategories';
import BestSellers from '../components/Home/BestSellers';
import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Button from '../components/Button/Button'
import heroImage from '../components/assets/hero-image-copy.jpg';
import vectorImage from '../components/assets/Vector 1.png'
import './HomePage.css'
import magtop1 from '../components/assets/Frame 80.svg';
import magtop2 from '../components/assets/Frame 81.svg';
import magtop3 from '../components/assets/Frame 82.svg';
import clothingImage from '../components/assets/Clothing.jpg'; // путь к изображению одежды
import footwearImage from '../components/assets/Footwear.jpg'; // путь к изображению обуви
import accessoriesImage from '../components/assets/Accessories.jpg'; // путь к изображению аксессуаров


function HomePage() {
  return (

    <div >  
      <div className="header-image-container">  
      <div className="text-overlay"></div>
       <img src={heroImage} alt="Cyclist" className="cyclist-image" />
      <div className="text-overlay">
        <h1>Твоя перемога ближче, ніж здається!</h1>
        <p>Знижка до 70% на весь асортимент спортивних товарів!</p>
      </div>
      <a href="#"><img src={magtop1} alt="magtop" className="magtop1" /></a>
      <a href="#"><img src={magtop2} alt="magtop" className="magtop2" /> </a>      
      <a href="#"><img src={magtop3} alt="magtop" className="magtop3" /></a>
    </div>


    
     {/* <div className="banner">
       <img src={heroImage} alt="Cyclist" className="cyclist-image" />
       <img src={vectorImage} alt="Vector Overlay" className="vector-image" /> 
      <h1>Твоя перемога ближче, ніж здається!</h1>
      <p>Знижка до 70% на весь асортимент спортивних товарів!</p>
    </div>
    <div className="product-list">
      <div className="product">Продукт 1</div>
      <div className="product">Продукт 2</div>
      <div className="product">Продукт 3</div>
    </div> */}

    <div className="middle-section">
      <h2>РУХАЙСЯ</h2>
      <p>до мети з комфортом!</p>
      <div className="images-container">
        <div className="image-box">
          <img src={clothingImage} alt="Clothing" />
          <p className='image-with-text'>ОДЯГ</p>
            <a href="#"><button className="shop-button-middle">Магазин</button></a> 
        </div>
        <div className="image-box">
          <img src={footwearImage} alt="Footwear" />
          <p>ВЗУТТЯ</p>
            <a href="#"><button className="shop-button-middle">Магазин</button></a> 
        </div>
        <div className="image-box">
          <img src={accessoriesImage} alt="Accessories" />
          <p>АКСЕСУАРИ</p>
            <a href="#"><button className="shop-button-middle">Магазин</button></a> 
        </div>
      </div>
    </div>
    <div className="hit-prodagy">
      <h1>Хит продажу</h1>
      <div className="product-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-card">
            <a href="#"><button className="shop-button">Магазин</button></a>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}

export default HomePage;

