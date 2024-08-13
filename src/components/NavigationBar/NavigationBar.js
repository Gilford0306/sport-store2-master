import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <a href="/store">Новинки</a>
      <a href="/store">Чоловіки</a>
      <a href="/store">Жінки</a>
      <a href="/store">Діти</a>
    </div>
  );
};

export default NavigationBar;
