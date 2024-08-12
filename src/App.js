import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/ErrorPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUses from './pages/TermsOfUses';
import { CartProvider } from './components/contexts/CartContext';
import { UserProvider } from './components/contexts/UserContext'

import './styles/global.css';

function App() {
  return (
     <UserProvider>
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <div className="wrapper">
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorite" element={<FavoritesPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-uses" element={<TermsOfUses />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
    </UserProvider>
  );
}

export default App;
