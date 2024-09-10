import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <a href="/sport-store2-master/#/store">Новинки</a>
      <a href="/sport-store2-master/#/store?gender=Чоловіче">Чоловіки</a>
      <a href="/sport-store2-master/#/store?gender=Жіноче">Жінки</a>
      <a href="/sport-store2-master/#/store?gender=Унісекс">Унісекс</a>
    </div>
  );
};

export default NavigationBar;
