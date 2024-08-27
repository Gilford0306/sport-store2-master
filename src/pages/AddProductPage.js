import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProductPage.css"; 

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sports, setSports] = useState([]);
  const [form, setForm] = useState({
    Name: "",
    Description: "",
    Price: "",
    IsAvailable: true,
    CategoryId: "",
    SubcategoryId: "",
    BrandId: "",
    ColorId: "",
    GenderId: "",
    SportId: "",
    DiscountId: "",
    CountryId: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://localhost:7000/api/Product/GetAllItemsFromUniversalClass?classtype=Cathegory"
      )
      .then((response) => setCategories(response.data));
    axios
      .get("https://localhost:7000/api/Product/GetAllSubcathegories")
      .then((response) => setSubcategories(response.data));
    axios
      .get(
        "https://localhost:7000/api/Product/GetAllItemsFromUniversalClass?classtype=Brand"
      )
      .then((response) => setBrands(response.data));
    axios
      .get(
        "https://localhost:7000/api/Product/GetAllItemsFromUniversalClass?classtype=Color"
      )
      .then((response) => setColors(response.data));
    axios
      .get(
        "https://localhost:7000/api/Product/GetAllItemsFromUniversalClass?classtype=Gender"
      )
      .then((response) => setGenders(response.data));
    axios
      .get(
        "https://localhost:7000/api/Product/GetAllItemsFromUniversalClass?classtype=Sport"
      )
      .then((response) => setSports(response.data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");


  const productData = {
    subcathegoryId: form.SubcategoryId,
    name: form.Name,
    cathegoryId: form.CategoryId,
    description: form.Description,
    price: parseFloat(form.Price), 
    photos: [], 
    listOfSizes: [], 
    discountId: form.DiscountId || null,
    isAvailable: form.IsAvailable,
    countryId: form.CountryId,
    brandId: form.BrandId,
    genderId: form.GenderId,
    sportId: form.SportId,
    colorId: form.ColorId,
  };

  axios
    .post("https://localhost:7000/api/Product/AddNewProduct", productData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
    .then((response) => {
      alert("Product added successfully!");
      setForm({
        Name: "",
        Description: "",
        Price: "",
        IsAvailable: true,
        CategoryId: "",
        SubcategoryId: "",
        BrandId: "",
        ColorId: "",
        GenderId: "",
        SportId: "",
        DiscountId: "",
        CountryId: "",
      });
    })
    .catch((error) => {
      alert("Failed to add product.");
      console.error(error.response.data);
    });
};

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Додавання нового продукту</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label className="add-product-label-name">
          Назва:
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            required
            className="add-product-input-name"
          />
        </label>
        <br />
        <label className="add-product-label-description">
          Опис:
          <textarea
            name="Description"
            value={form.Description}
            onChange={handleChange}
            required
            className="add-product-input-description"
          />
        </label>
        <br />
        <label className="add-product-label-price">
          Ціна:
          <input
            type="number"
            name="Price"
            value={form.Price}
            onChange={handleChange}
            required
            className="add-product-input-price"
          />
        </label>
        <br />
        <label className="add-product-label-category">
          Категорія:
          <select
            name="CategoryId"
            value={form.CategoryId}
            onChange={handleChange}
            required
            className="add-product-input-category"
          >
            <option value="">Обиріть категорію </option>
            {categories.map((cat) => (
              <option key={cat.Id} value={cat.Id}>
                {cat.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-subcategory">
          Субкатегорія:
          <select
            name="SubcategoryId"
            value={form.SubcategoryId}
            onChange={handleChange}
            required
            className="add-product-input-subcategory"
          >
            <option value="">Обиріть субкатегорію </option>
            {subcategories.map((subcat) => (
              <option key={subcat.Id} value={subcat.Id}>
                {subcat.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-brand">
          Бренд:
          <select
            name="BrandId"
            value={form.BrandId}
            onChange={handleChange}
            required
            className="add-product-input-brand"
          >
            <option value="">Обиріть бренд</option>
            {brands.map((brand) => (
              <option key={brand.Id} value={brand.Id}>
                {brand.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-color">
          Колор:
          <select
            name="ColorId"
            value={form.ColorId}
            onChange={handleChange}
            required
            className="add-product-input-color"
          >
            <option value="">Обиріть колір</option>
            {colors.map((color) => (
              <option key={color.Id} value={color.Id}>
                {color.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-gender">
          Пол:
          <select
            name="GenderId"
            value={form.GenderId}
            onChange={handleChange}
            required
            className="add-product-input-gender"
          >
            <option value="">Обиріть пол</option>
            {genders.map((gender) => (
              <option key={gender.Id} value={gender.Id}>
                {gender.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-sport">
          Спорт:
          <select
            name="SportId"
            value={form.SportId}
            onChange={handleChange}
            required
            className="add-product-input-sport"
          >
            <option value="">Обиріть спорт </option>
            {sports.map((sport) => (
              <option key={sport.Id} value={sport.Id}>
                {sport.Name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="add-product-label-available">
          Доступність:
          <input
            type="checkbox"
            name="IsAvailable"
            checked={form.IsAvailable}
            onChange={(e) =>
              setForm({ ...form, IsAvailable: e.target.checked })
            }
            className="add-product-input-available"
          />
        </label>
        <br />
        <button type="submit" className="add-product-submit-button">
          Додати продукт
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
