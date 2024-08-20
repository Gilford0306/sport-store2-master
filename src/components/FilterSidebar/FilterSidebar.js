import React, { useState, useCallback } from "react";
import "./FilterSidebar.css";

function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    gender: [],
    colors: [],
    priceRange: [],
    brand: [],
    sport: [],
  });

  const handleCheckboxChange = useCallback(
    (category, values) => {
      setFilters((prevFilters) => {
        // Обрабатываем каждое значение
        const newCategoryValues = values.reduce(
          (acc, value) => {
            if (prevFilters[category].includes(value)) {
              // Убираем значение, если оно уже есть
              return acc.filter((item) => item !== value);
            } else {
              // Добавляем значение, если его нет
              return [...acc, value];
            }
          },
          [...prevFilters[category]]
        );

        const newFilters = {
          ...prevFilters,
          [category]: newCategoryValues,
        };

        if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
          onFilterChange(newFilters);
        }
        return newFilters;
      });
    },
    [onFilterChange]
  );

  return (
    <div className="filter-sidebar">
      <h3>Фільтр</h3>
      <form>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Одяг"
              onChange={(e) =>
                handleCheckboxChange("categories", ["Всі", "Одяг"])
              }
            />
            Одяг
          </label>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Взуття"
              onChange={(e) => handleCheckboxChange("categories", ["Взуття"])}
            />
            Взуття
          </label>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Аксесуари"
              onChange={(e) =>
                handleCheckboxChange("categories", ["Аксесуари"])
              }
            />
            Аксесуари
          </label>
        </div>

        <h4>Тип одягу</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Футболки"
              onChange={(e) =>
                handleCheckboxChange("subcategories", ["Футболка"])
              }
            />
            Футболки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Топи"
              onChange={(e) => handleCheckboxChange("subcategories", ["Топ"])}
            />
            Топ
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Шорти"
              onChange={(e) => handleCheckboxChange("subcategories", ["Шорти"])}
            />
            Шорти
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Майки"
              onChange={(e) => handleCheckboxChange("subcategories", ["Майка"])}
            />
            Майки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Кофти"
              onChange={(e) => handleCheckboxChange("subcategories", ["Кофта"])}
            />
            Кофта
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Кепки"
              onChange={(e) => handleCheckboxChange("subcategories", ["Кепка"])}
            />
            Кепки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Поло"
              onChange={(e) => handleCheckboxChange("subcategories", ["Поло"])}
            />
            Поло
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Легінси"
              onChange={(e) =>
                handleCheckboxChange("subcategories", ["Легінси"])
              }
            />
            Легінси
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Сумки"
              onChange={(e) => handleCheckboxChange("subcategories", ["Сумки"])}
            />
            Сумки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Куртки"
              onChange={(e) =>
                handleCheckboxChange("subcategories", ["Куртки"])
              }
            />
            Куртки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Шапки"
              onChange={(e) => handleCheckboxChange("subcategories", ["Шапки"])}
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
                handleCheckboxChange("subcategories", ["Рукавиці"])
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
                handleCheckboxChange("subcategories", ["Нижня білизна"])
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
              onChange={(e) => handleCheckboxChange("gender", ["Чоловік"])}
            />
            Чоловік
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Жінка"
              onChange={(e) => handleCheckboxChange("gender", ["Жінка"])}
            />
            Жінка
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Унісекс"
              onChange={(e) => handleCheckboxChange("gender", ["Унісекс"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Чорний"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Червоний"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Синій"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Зелений"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Помаранчевий"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Фіолетовий"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Жовтий"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Коричневий"])}
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
              onChange={(e) => handleCheckboxChange("colors", ["Сірий"])}
            />
            Сірий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "pink" }}
            ></span>
            <input
              type="checkbox"
              name="Рожевий"
              onChange={(e) => handleCheckboxChange("colors", ["Рожевий"])}
            />
            Рожевий
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
              onChange={(e) => handleCheckboxChange("colors", ["Білий"])}
            />
            Білий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span
              className="color-circle"
              style={{ backgroundColor: "lightgray" }}
            ></span>
            <input
              type="checkbox"
              name="Світло-сірий"
              onChange={(e) => handleCheckboxChange("colors", ["Світло-сірий"])}
            />
            Світло-сірий
          </label>
        </div>
        <h4>Бренд</h4>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Nike"
              onChange={(e) => handleCheckboxChange("brand", ["Nike"])}
            />
            Nike
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Adidas"
              onChange={(e) => handleCheckboxChange("brand", ["New Balance"])}
            />
            New Balance
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Puma"
              onChange={(e) => handleCheckboxChange("brand", ["Puma"])}
            />
            Puma
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Reebok"
              onChange={(e) => handleCheckboxChange("brand", ["Reebok"])}
            />
            Reebok
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Under Armour"
              onChange={(e) => handleCheckboxChange("brand", ["Under Armour"])}
            />
            Under Armour
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Asics Tiger"
              onChange={(e) => handleCheckboxChange("brand", ["Asics Tiger"])}
            />
            Asics Tiger
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Columbia"
              onChange={(e) => handleCheckboxChange("brand", ["Columbia"])}
            />
            Columbia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="The North Face"
              onChange={(e) =>
                handleCheckboxChange("brand", ["The North Face"])
              }
            />
            The North Face
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Patagonia"
              onChange={(e) => handleCheckboxChange("brand", ["Patagonia"])}
            />
            Patagonia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              name="Lacoste"
              onChange={(e) => handleCheckboxChange("brand", ["Lacoste"])}
            />
            Lacoste
          </label>
        </div>
      </form>
    </div>
  );
}

export default FilterSidebar;
