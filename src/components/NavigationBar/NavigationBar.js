import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <a href="/store">Новинки</a>
      <a href="/store?gender=Чоловік">Чоловіки</a>
      <a href="/store?gender=Жінка">Жінки</a>
      <a href="/store?gender=Унісекс">Унісекс</a>
    </div>
  );
};

export default NavigationBar;
