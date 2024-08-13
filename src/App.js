import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUses from "./pages/TermsOfUses";
import StorePage from "./pages/StorePage";

import { CartProvider } from "./components/contexts/CartContext";
import { UserProvider } from "./components/contexts/UserContext";
import { ProductProvider } from "./components/contexts/ProductContext";
import { FavoritesProvider } from "./components/contexts/FavoritesContext";

import "./styles/global.css";

import NikeACG from "./components/assets/store/NikeACG.png";
import NikeMC from "./components/assets/store/NikeMC.png";
import predator from "./components/assets/store/predator.png";
import galaxy from "./components/assets/store/galaxy .png";
import ADICOLOR from "./components/assets/store/ADICOLOR.png";
import CITYESCAPE from "./components/assets/store/CITYESCAPE.png";
import ESSENTIALS from "./components/assets/store/ESSENTIALS.png";
import Unlimited from "./components/assets/store/Unlimited.png";
import Recharge from "./components/assets/store/Recharge.png";
import Sportswear from "./components/assets/store/Sportswear.png";
import Jordan from "./components/assets/store/Jordan.png";
import dri from "./components//assets/store/dri.png";
import Jersey from "./components/assets/store/Jersey.png";
import Calm from "./components/assets/store/Calm.png";
import Interact from "./components/assets/store/Interact.png";

function App() {
  const products = [
    {
      id: 1,
      name: "Nike ACG",
      description: "Чоловіча футболка Dri-FIT",
      price: 2200,
      image: NikeACG,
      full_description:
        "Поєднання важкої змішаної тканини та просторого крою робить цю футболку ACG GOAT. Технологія Nike Dri-FIT відводить піт від вашої шкіри для швидшого випаровування, допомагаючи вам залишатися сухими та комфортними.",
      category: "Одяг",
      subcategory: "Топи та футболки",
      gender: "Чоловік",
      color: "Чорний",
      priceRange: "2000 - 2500",
      brand: "Nike",
      activity: "Тренування",
    },
    {
      id: 2,
      name: "Nike MC Trainer 3",
      price: 3300,
      description: "Чоловіче спортивне взуття",
      image: NikeMC,
      full_description:
        "Nike MC Trainer 3 – універсальні кросівки, які підходять для тренувань у залі та на вулиці. Міцна підошва забезпечує хороше зчеплення з поверхнею, а верхня частина взуття з дихаючого матеріалу забезпечує комфорт під час занять спортом.",
      category: "Взуття",
      subcategory: "Спортивне взуття",
      gender: "Чоловік",
      color: "Чорний",
      priceRange: "3000 - 3500",
      brand: "Nike",
      activity: "Тренування",
    },
    {
      id: 3,
      name: "Футбольні бутси predator 24 league",
      price: 1800,
      description: "Чоловіче спортивне взуття",
      image: predator,
      full_description:
        "Футбольні бутси Predator 24 League розроблені для гри на високих швидкостях. Спеціальна конструкція підошви забезпечує відмінне зчеплення з полем, а матеріал верху дозволяє контролювати м'яч з максимальною точністю.",
      category: "Взуття",
      subcategory: "Спортивне взуття",
      gender: "Чоловік",
      color: "Синій",
      priceRange: "1500 - 2000",
      brand: "Adidas",
      activity: "Футбол",
    },
    {
      id: 4,
      name: "Кросівки galaxy 6",
      price: 2798,
      description: "Чоловіче спортивне взуття",
      image: galaxy,
      full_description:
        "Кросівки Galaxy 6 поєднують у собі стиль та комфорт. Вони виготовлені з легких матеріалів, що забезпечують зручність під час тривалого носіння. Ідеальні для повсякденного використання та спортивних занять.",
      category: "Взуття",
      subcategory: "Спортивне взуття",
      gender: "Чоловік",
      color: "Сірий",
      priceRange: "2500 - 3000",
      brand: "Adidas",
      activity: "Тренування",
    },
    {
      id: 5,
      name: "Футболка ADICOLOR TREFOIL",
      price: 899,
      description: "Чоловіча футболка",
      image: ADICOLOR,
      full_description:
        "Футболка ADICOLOR TREFOIL – це класика в світі спортивного одягу. Виготовлена з м'якої бавовни, вона забезпечує комфорт протягом усього дня. Стильний логотип Adidas на грудях додає особливий акцент.",
      category: "Одяг",
      subcategory: "Топи та футболки",
      gender: "Чоловік",
      color: "Білий",
      priceRange: "0 - 1000",
      brand: "Adidas",
      activity: "Повсякденне носіння",
    },
    {
      id: 6,
      name: "Спортивні штани CITY ESCAPE PREMIUM",
      price: 2000,
      description: "Чоловічі спортивні штани",
      image: CITYESCAPE,
      full_description:
        "Спортивні штани CITY ESCAPE PREMIUM поєднують в собі зручність та стиль. Вони виготовлені з дихаючого матеріалу, що дозволяє підтримувати комфортну температуру тіла під час тренувань або прогулянок на свіжому повітрі.",
      category: "Одяг",
      subcategory: "Штани",
      gender: "Чоловік",
      color: "Чорний",
      priceRange: "1500 - 2000",
      brand: "Columbia",
      activity: "Тренування",
    },
    {
      id: 7,
      name: "ШТАНИ ESSENTIALS FRENCH TERRY TAP...",
      price: 2300,
      description: "Чоловічі штани",
      image: ESSENTIALS,
      full_description:
        "Штани Essentials French Terry виготовлені з м'якого трикотажного матеріалу, що забезпечує зручність і комфорт. Вони ідеально підходять для повсякденного носіння, забезпечуючи свободу рухів.",
      category: "Одяг",
      subcategory: "Штани",
      gender: "Чоловік",
      color: "Сірий",
      priceRange: "2000 - 2500",
      brand: "Adidas",
      activity: "Повсякденне носіння",
    },
    {
      id: 8,
      name: "Nike Unlimited",
      price: 1500,
      description: "Чоловічі спортивні шорти",
      image: Unlimited,
      full_description:
        "Nike Unlimited – це спортивні шорти, що забезпечують максимальний комфорт під час активних тренувань. Вони виготовлені з дихаючого матеріалу та мають зручну посадку, що не обмежує рухів.",
      category: "Одяг",
      subcategory: "Шорти",
      gender: "Чоловік",
      color: "Зелений",
      priceRange: "1000 - 1500",
      brand: "Nike",
      activity: "Тренування",
    },
    {
      id: 9,
      name: "Nike Recharge",
      price: 600,
      description: "",
      image: Recharge,
      full_description:
        "Пляшка для води Nike Recharge дозволяє підтримувати гідратацію під час тренувань. Виготовлена з високоякісних матеріалів, вона зручна у використанні та має стильний дизайн.",
      category: "Аксесуари",
      subcategory: "Пляшки",
      gender: "Унісекс",
      color: "Червоний",
      priceRange: "0 - 1000",
      brand: "Nike",
      activity: "Тренування",
    },
    {
      id: 10,
      name: "Nike Sportswear Phoenix Fleece",
      price: 3100,
      description: "Жіноча худі",
      image: Sportswear,
      full_description:
        "Худі Nike Sportswear Phoenix Fleece – це стильний і теплий варіант для холодних днів. Виготовлена з м'якого флісового матеріалу, вона забезпечує тепло і комфорт. Ідеальна для повсякденного носіння.",
      category: "Одяг",
      subcategory: "Худі",
      gender: "Жінка",
      color: "Чорний",
      priceRange: "3000 - 3500",
      brand: "Nike",
      activity: "Повсякденне носіння",
    },
    {
      id: 11,
      name: "Air Jordan 1 Low SE",
      price: 4500,
      description: "Жіноче взуття",
      image: Jordan,
      full_description:
        "Кросівки Air Jordan 1 Low SE – це легендарний стиль та комфорт. Вони мають класичний дизайн, який підходить для будь-якого образу. Виготовлені з якісних матеріалів, вони забезпечують тривалу зручність у носінні.",
      category: "Взуття",
      subcategory: "Спортивне взуття",
      gender: "Жінка",
      color: "Білий",
      priceRange: "4000 - 5000",
      brand: "Jordan",
      activity: "Повсякденне носіння",
    },
    {
      id: 12,
      name: "Jordan Dri-FIT Jumpman",
      price: 120,
      description: "Пов'язка на голову",
      image: dri,
      full_description:
        "Пов'язка на голову Jordan Dri-FIT Jumpman забезпечує комфорт під час спортивних занять. Вона відводить піт від шкіри і допомагає підтримувати відчуття сухості, а також запобігає потраплянню волосся в очі.",
      category: "Аксесуари",
      subcategory: "Головні убори",
      gender: "Унісекс",
      color: "Чорний",
      priceRange: "0 - 200",
      brand: "Jordan",
      activity: "Тренування",
    },
    {
      id: 13,
      name: "Jordan 23 Jersey",
      price: 2000,
      description: "Жіноча майка",
      image: Jersey,
      full_description:
        "Жіноча майка Jordan 23 Jersey поєднує в собі стиль та функціональність. Вона виготовлена з дихаючого матеріалу, що дозволяє зберігати комфорт під час активних занять. Ідеальна для тренувань або повсякденного носіння.",
      category: "Одяг",
      subcategory: "Майки",
      gender: "Жінка",
      color: "Червоний",
      priceRange: "2000 - 2500",
      brand: "Jordan",
      activity: "Тренування",
    },
    {
      id: 14,
      name: "Nike Calm",
      price: 600,
      description: "Чоловічі капці",
      image: Calm,
      full_description:
        "Чоловічі капці Nike Calm забезпечують зручність та комфорт протягом усього дня. Вони виготовлені з легких матеріалів, що забезпечують відчуття легкості та зручності при носінні.",
      category: "Взуття",
      subcategory: "Капці",
      gender: "Чоловік",
      color: "Синій",
      priceRange: "0 - 1000",
      brand: "Nike",
      activity: "Повсякденне носіння",
    },
    {
      id: 15,
      name: "Nike Interact Run",
      price: 2700,
      description: "Чоловічі кросівки",
      image: Interact,
      full_description:
        "Кросівки Nike Interact Run – це поєднання стилю і комфорту. Вони мають амортизаційну підошву, яка забезпечує підтримку під час бігу, а також дихаючий верх для додаткового комфорту.",
      category: "Взуття",
      subcategory: "Спортивне взуття",
      gender: "Чоловік",
      color: "Чорний",
      priceRange: "2500 - 3000",
      brand: "Nike",
      activity: "Біг",
    },
  ];
  return (
    <UserProvider>
      <CartProvider>
        <FavoritesProvider>
          <ProductProvider products={products}>
            <Router>
              <div className="App">
                <Header />
                <div className="wrapper">
                  <main>
                    <Routes>
                      <Route path="/" element={<HomePage />} />

                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/favorite" element={<FavoritesPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/profile" element={<UserProfilePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="*" element={<ErrorPage />} />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route path="/terms-of-uses" element={<TermsOfUses />} />
                      <Route
                        path="/store"
                        element={<StorePage products={products} />}
                      />
                      <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                      />
                    </Routes>
                  </main>
                </div>
                <Footer />
              </div>
            </Router>
          </ProductProvider>
        </FavoritesProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
