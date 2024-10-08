import React, { useEffect, useState } from "react";
import { HashRouter  as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUses from "./pages/TermsOfUses";
import StorePage from "./pages/StorePage";
import MapPage from "./pages/MapPage";
import HelpPage from "./pages/HelpPage";
import GiftCardPage from "./pages/GiftCardPage";
import OrderPage from "./pages/OrderPage";
import AllOrdersPage from "./pages/AllOrdersPage";
import AddProductPage from "./pages/AddProductPage";
import { CartProvider } from "./components/contexts/CartContext";
import { UserProvider } from "./components/contexts/UserContext";
import { ProductProvider } from "./components/contexts/ProductContext";
import { FavoritesProvider } from "./components/contexts/FavoritesContext";
import API_BASE_URL from "../src/services/api";

import "./styles/global.css";

function App() {
  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [cathegories, setCathegories] = useState([]);
  const [subcathegories, setSubcathegories] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const statusesResponse = await fetch(
           `${API_BASE_URL}/Order/GetAllStatuses`
        );
        const statusesData = await statusesResponse.json();
        setStatuses(statusesData);
        console.log(statusesData);

        const brandsResponse = await fetch(
           `${API_BASE_URL}/Product/GetAllItemsFromUniversalClass?classtype=Brand`
        );
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);

        // Получаем все цвета
        const colorsResponse = await fetch(
          `${API_BASE_URL}/Product/GetAllItemsFromUniversalClass?classtype=Color`
        );
        const colorsData = await colorsResponse.json();
        setColors(colorsData.Value);
        console.log(colorsData);

        // Получаем все категории
        const cathegoriesResponse = await fetch(
          `${API_BASE_URL}/Product/GetAllItemsFromUniversalClass?classtype=Cathegory`
        );
        const cathegoriesData = await cathegoriesResponse.json();
        setCathegories(cathegoriesData);

        // Получаем все субкатегории
        const subcathegoriesResponse = await fetch(
          `${API_BASE_URL}/Product/GetAllSubcathegories`
        );
        const subcathegoriesData = await subcathegoriesResponse.json();
        setSubcathegories(subcathegoriesData);
        console.log("subcathegoriesData -", subcathegoriesData);

        // Получаем все виды спорта
        const sportsResponse = await fetch(
          `${API_BASE_URL}/Product/GetAllItemsFromUniversalClass?classtype=Sport`
        );
        const sportsData = await sportsResponse.json();
        setSports(sportsData);
        console.log("sportsData - ", sportsData);

        // Получаем все гендеры
        const gendersResponse = await fetch(
          `${API_BASE_URL}/Product/GetAllItemsFromUniversalClass?classtype=Gender`
        );
        const genderssData = await gendersResponse.json();
        setSports(genderssData);
        console.log("GendersData - ", genderssData);

        // Получаем все продукты
        const productsResponse = await fetch(

              `${API_BASE_URL}/Product/GetAllProducts`
        );
        const productsData = await productsResponse.json();
        console.log("productsData - ", productsData.Value);

        // Получаем фотографии для каждого продукта
        const productsWithPhotos = await Promise.all(
          productsData.map(async (product) => {
            const photosResponse = await fetch(
                `${API_BASE_URL}/Product/GetPhotosByProductId${product.Id}`
            );
            const photosData = await photosResponse.json();
            return {
              ...product,
              image:
                photosData.length > 0 ? photosData[0].URL : "placeholder.jpg",
              images: photosData.map(photo => photo.URL),
              isAvailable: product.IsAvailable,
            };
          })
        );

        const updatedProducts = productsWithPhotos.map((product) => {
          const brand = brandsData.find((b) => b.Id === product.BrandId);
          const color = colorsData.find((c) => c.Id === product.ColorId);
          const category = cathegoriesData.find(
            (b) => b.Id === product.CathegoryId
          ); 
          const subcategory = subcathegoriesData.find(
            (b) => b.Id === product.SubcathegoryId
          );
          const gender = genderssData.find((b) => b.Id === product.GenderId);
          const sport = sportsData.find((b) => b.Id === product.SportId);

          return {
            id: product.Id,
            name: product.Name,
            description: product.Description,
            price: product.Price,
            image: product.image,
            images: product.images,
            full_description: product.Description,
            category: category ? category.Name : "Unknown",
            subcategory: subcategory ? subcategory.Name : "Unknown",
            gender: gender ? gender.Name : "Unknown",
            priceRange: `0 - ${product.Price}`,
            brand: brand ? brand.Name : "Unknown",
            color: color ? color.Name : "Unknown",
            sport: sport ? sport.Name : "Unknown",
            isAvailable: product.isAvailable,
            SubcathegoryId: product.SubcathegoryId,
            CathegoryId: product.CathegoryId,
            DiscountId: product.DiscountId,
            CountryId: product.CountryId,
            BrandId: product.BrandId,
            GenderId: product.GenderId,
            SportId: product.SportId,
            ColorId: product.ColorId,
          };
        });

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <CartProvider>
      <FavoritesProvider>
        <UserProvider>
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
                      <Route path="/profile" element={<UserProfilePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="*" element={<ErrorPage />} />
                      <Route path="/help" element={<HelpPage />} />
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
                      <Route path="/map" element={<MapPage />} />
                      <Route path="/gift" element={<GiftCardPage />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route
                        path="/all-orders"
                        element={
                          <AllOrdersPage
                            products={products}
                            statuses={statuses}
                          />
                        }
                      />
                      <Route path="/add-product" element={<AddProductPage />} />
                    </Routes>
                  </main>
                </div>
                <Footer />
              </div>
            </Router>
          </ProductProvider>
        </UserProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
