import React, { useState } from "react";
import "./FilterSidebar.css";

function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    gender: [],
    colors: [],
    priceRange: [],
    brand: [],
    activity: [],
  });

  if (typeof onFilterChange !== "function") {
    console.error("onFilterChange is not a function");
    return null;
  }

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const newCategoryValues = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      const newFilters = {
        ...prevFilters,
        [category]: newCategoryValues,
      };

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="filter-sidebar">
      <h3>Фільтр</h3>
      <form>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Одяг"
              onChange={(e) => handleCheckboxChange("categories", "Одяг")}
            />
            Одяг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Взуття"
              onChange={(e) => handleCheckboxChange("categories", "Взуття")}
            />
            Взуття
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Аксесуари"
              onChange={(e) => handleCheckboxChange("categories", "Аксесуари")}
            />
            Аксесуари
          </label>
        </div>

        <h4>Тип одягу</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Топи та футболки"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Топи та футболки")
              }
            />
            Топи та футболки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Шорти"
              onChange={(e) => handleCheckboxChange("subcategories", "Шорти")}
            />
            Шорти
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Худі та пуловери"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Худі та пуловери")
              }
            />
            Худі та пуловери
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Куртки та жилети"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Куртки та жилети")
              }
            />
            Куртки та жилети
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Штани"
              onChange={(e) => handleCheckboxChange("subcategories", "Штани")}
            />
            Штани
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Спортивні костюми"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Спортивні костюми")
              }
            />
            Спортивні костюми
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Шкарпетки"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Шкарпетки")
              }
            />
            Шкарпетки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Світшоти"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Світшоти")
              }
            />
            Світшоти
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Куртки"
              onChange={(e) => handleCheckboxChange("subcategories", "Куртки")}
            />
            Куртки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Шапки"
              onChange={(e) => handleCheckboxChange("subcategories", "Шапки")}
            />
            Шапки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Рукавиці"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Рукавиці")
              }
            />
            Рукавиці
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Нижня білизна"
              onChange={(e) =>
                handleCheckboxChange("subcategories", "Нижня білизна")
              }
            />
            Нижня білизна
          </label>
        </div>

        <h4>Стать</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Чоловік"
              onChange={(e) => handleCheckboxChange("gender", "Чоловік")}
            />
            Чоловік
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Жінка"
              onChange={(e) => handleCheckboxChange("gender", "Жінка")}
            />
            Жінка
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Унісекс"
              onChange={(e) => handleCheckboxChange("gender", "Унісекс")}
            />
            Унісекс
          </label>
        </div>

        <h4>Колір</h4>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "black" }}
            ></span>
            <input
              type="checkbox"
              name="Чорний"
              onChange={(e) => handleCheckboxChange("colors", "Чорний")}
            />
            Чорний
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "red" }}
            ></span>
            <input
              type="checkbox"
              name="Червоний"
              onChange={(e) => handleCheckboxChange("colors", "Червоний")}
            />
            Червоний
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "blue" }}
            ></span>
            <input
              type="checkbox"
              name="Синій"
              onChange={(e) => handleCheckboxChange("colors", "Синій")}
            />
            Синій
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "green" }}
            ></span>
            <input
              type="checkbox"
              name="Зелений"
              onChange={(e) => handleCheckboxChange("colors", "Зелений")}
            />
            Зелений
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "orange" }}
            ></span>
            <input
              type="checkbox"
              name="Помаранчевий"
              onChange={(e) => handleCheckboxChange("colors", "Помаранчевий")}
            />
            Помаранчевий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "purple" }}
            ></span>
            <input
              type="checkbox"
              name="Фіолетовий"
              onChange={(e) => handleCheckboxChange("colors", "Фіолетовий")}
            />
            Фіолетовий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "yellow" }}
            ></span>
            <input
              type="checkbox"
              name="Жовтий"
              onChange={(e) => handleCheckboxChange("colors", "Жовтий")}
            />
            Жовтий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "brown" }}
            ></span>
            <input
              type="checkbox"
              name="Коричневий"
              onChange={(e) => handleCheckboxChange("colors", "Коричневий")}
            />
            Коричневий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "gray" }}
            ></span>
            <input
              type="checkbox"
              name="Сірий"
              onChange={(e) => handleCheckboxChange("colors", "Сірий")}
            />
            Сірий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "white" }}
            ></span>
            <input
              type="checkbox"
              name="Білий"
              onChange={(e) => handleCheckboxChange("colors", "Білий")}
            />
            Білий
          </label>
        </div>

        <h4>Ціна</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="0 - 250"
              onChange={(e) => handleCheckboxChange("priceRange", "0 - 250")}
            />
            ₴0 - ₴250
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="250 - 500"
              onChange={(e) => handleCheckboxChange("priceRange", "250 - 500")}
            />
            ₴250 - ₴500
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="500 - 1000"
              onChange={(e) => handleCheckboxChange("priceRange", "500 - 1000")}
            />
            ₴500 - ₴1000
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="1000 - 1500"
              onChange={(e) =>
                handleCheckboxChange("priceRange", "1000 - 1500")
              }
            />
            ₴1000 - ₴1500
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Більше 1500"
              onChange={(e) =>
                handleCheckboxChange("priceRange", "Більше 1500")
              }
            />
            Більше ₴1500
          </label>
        </div>

        <h4>Бренд</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Nike"
              onChange={(e) => handleCheckboxChange("brand", "Nike")}
            />
            Nike
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Adidas"
              onChange={(e) => handleCheckboxChange("brand", "Adidas")}
            />
            Adidas
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Puma"
              onChange={(e) => handleCheckboxChange("brand", "Puma")}
            />
            Puma
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Reebok"
              onChange={(e) => handleCheckboxChange("brand", "Reebok")}
            />
            Reebok
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Under Armour"
              onChange={(e) => handleCheckboxChange("brand", "Under Armour")}
            />
            Under Armour
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Asics Tiger"
              onChange={(e) => handleCheckboxChange("brand", "Asics Tiger")}
            />
            Asics Tiger
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Columbia"
              onChange={(e) => handleCheckboxChange("brand", "Columbia")}
            />
            Columbia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="The North Face"
              onChange={(e) => handleCheckboxChange("brand", "The North Face")}
            />
            The North Face
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Patagonia"
              onChange={(e) => handleCheckboxChange("brand", "Patagonia")}
            />
            Patagonia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Lacoste"
              onChange={(e) => handleCheckboxChange("brand", "Lacoste")}
            />
            Lacoste
          </label>
        </div>

        <h4>Спорт і активний відпочинок</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Біг"
              onChange={(e) => handleCheckboxChange("activity", "Біг")}
            />
            Біг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Футбол"
              onChange={(e) => handleCheckboxChange("activity", "Футбол")}
            />
            Футбол
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Тренування"
              onChange={(e) => handleCheckboxChange("activity", "Тренування")}
            />
            Тренування
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Йога"
              onChange={(e) => handleCheckboxChange("activity", "Йога")}
            />
            Йога
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Баскетбол"
              onChange={(e) => handleCheckboxChange("activity", "Баскетбол")}
            />
            Баскетбол
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Бейсбол"
              onChange={(e) => handleCheckboxChange("activity", "Бейсбол")}
            />
            Бейсбол
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Гольф"
              onChange={(e) => handleCheckboxChange("activity", "Гольф")}
            />
            Гольф
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Скейтбординг"
              onChange={(e) => handleCheckboxChange("activity", "Скейтбординг")}
            />
            Скейтбординг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Ходьба"
              onChange={(e) => handleCheckboxChange("activity", "Ходьба")}
            />
            Ходьба
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Волейбол"
              onChange={(e) => handleCheckboxChange("activity", "Волейбол")}
            />
            Волейбол
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Плавання"
              onChange={(e) => handleCheckboxChange("activity", "Плавання")}
            />
            Плавання
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Танець"
              onChange={(e) => handleCheckboxChange("activity", "Танець")}
            />
            Танець
          </label>
        </div>
      </form>
    </div>
  );
}

export default FilterSidebar;
