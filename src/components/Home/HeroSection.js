// HeroSection.js
import React from 'react';
import styles from './HeroSection.module.css';
import heroImage from '../assets/hero-image.jpg';
import "./HeroSection.css";


function HeroSection() {
  return (
    <section className={styles.hero}>
      <img src={heroImage} alt="Cyclist" />
      <h1>Твоя перемога ближче, ніж здається!</h1>
      <p className='text-sale'>Знижка до 70% на весь асортимент спортивних товарів!</p>
    </section>
  );
}

export default HeroSection;
