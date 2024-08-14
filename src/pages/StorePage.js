import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import ProductList from "../components/ProductList/ProductList";
import "./ProductPage.css";
import "./StorePage.css";

function StorePage({ products }) {
  const location = useLocation();

  // Инициализация состояния фильтров
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    gender: [],
    colors: [],
    priceRange: [],
    brand: [],
    activity: [],
  });

  // Проверяем наличие параметра gender в URL и обновляем фильтры при загрузке страницы
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genderFilter = params.get("gender");

    if (genderFilter) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        gender: [genderFilter], // Устанавливаем фильтр по полу
      }));
    }
  }, [location]);

  // Функция для обновления фильтров
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Фильтрация продуктов на основе активных фильтров
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesSubcategory =
      filters.subcategories.length === 0 ||
      filters.subcategories.includes(product.subcategory);
    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(product.gender);
    const matchesColor =
      filters.colors.length === 0 || filters.colors.includes(product.color);
    const matchesPrice =
      filters.priceRange.length === 0 ||
      filters.priceRange.some((range) => {
        const [min, max] = range.split(" - ").map(Number);
        return product.price >= min && (max ? product.price <= max : true);
      });
    const matchesBrand =
      filters.brand.length === 0 || filters.brand.includes(product.brand);
    const matchesActivity =
      filters.activity.length === 0 ||
      filters.activity.includes(product.activity);

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesGender &&
      matchesColor &&
      matchesPrice &&
      matchesBrand &&
      matchesActivity
    );
  });

  return (
    <div className="product-page">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default StorePage;
