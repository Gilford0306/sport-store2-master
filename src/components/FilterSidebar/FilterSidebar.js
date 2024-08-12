import React from 'react';
import './FilterSidebar.css';

function FilterSidebar() {
  return (
    <div className="filter-sidebar">
      <h3>Фільтр</h3>
      <form>
        {/* Фильтры */}
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Одяг" />
            Одяг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Взуття" />
            Взуття
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Аксесуари" />
            Аксесуари
          </label>
        </div>

        <h4>Тип одягу</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Топи та футболки" />
            Топи та футболки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Шорти" />
            Шорти
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Худі та пуловери" />
            Худі та пуловери
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Куртки та жилети" />
            Куртки та жилети
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Штани" />
            Штани
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Спортивні костюми" />
            Спортивні костюми
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Шкарпетки" />
            Шкарпетки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Худі" />
            Худі
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Світшоти" />
            Світшоти
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Скейтбординг" />
            Скейтбординг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Штани" />
            Штани
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Куртки" />
            Куртки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Шапки" />
            Шапки
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Рукавиці" />
            Рукавиці
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Нижня білизна" />
            Нижня білизна
          </label>
        </div>

        <h4>Стать</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Чоловік" />
            Чоловік
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Жінка" />
            Жінка
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Унісекс" />
            Унісекс
          </label>
        </div>

        <h4>ДІТИ</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Хлопчик" />
            Хлопчик
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Дівчинка" />
            Дівчинка
          </label>
        </div>

        <h4>Колір</h4>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'black' }}></span>
            <input type="checkbox" name="Чорний" />
            Чорний
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'red' }}></span>
            <input type="checkbox" name="Червоний" />
            Червоний
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'blue' }}></span>
            <input type="checkbox" name="Синій" />
            Синій
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'green' }}></span>
            <input type="checkbox" name="Зелений" />
            Зелений
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'orange' }}></span>
            <input type="checkbox" name="Помаранчевий" />
            Помаранчевий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'purple' }}></span>
            <input type="checkbox" name="Фіолетовий" />
            Фіолетовий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'yellow' }}></span>
            <input type="checkbox" name="Жовтий" />
            Жовтий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'brown' }}></span>
            <input type="checkbox" name="Коричневий" />
            Коричневий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'gray' }}></span>
            <input type="checkbox" name="Сірий" />
            Сірий
          </label>
        </div>
        <div className="filter-group">
          <label className="color-filter">
            <span className="color-circle" style={{ backgroundColor: 'white' }}></span>
            <input type="checkbox" name="Білий" />
            Білий
          </label>
        </div>

        <h4>Ціна</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="0 - 250" />
            0 - 250
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="250 - 500" />
            250 - 500
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="500 - 1000" />
            500 - 1000
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="1000 - 1500" />
            1000 - 1500
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Більше 1500" />
            Більше 1500
          </label>
        </div>

        <h4>Бренд</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Nike" />
            Nike
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Adidas" />
            Adidas
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Puma" />
            Puma
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Reebok" />
            Reebok
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Under Armour" />
            Under Armour
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Asics Tiger" />
            Asics Tiger
          </label>
        </div>
                <div className="filter-group">
          <label>
            <input type="checkbox" name="Columbia" />
            Columbia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="The North Face" />
            The North Face
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Patagonia" />
            Patagonia
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Lacoste" />
            Lacoste
          </label>
        </div>

        <h4>Спорт і активний відпочинок</h4>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Біг" />
            Біг
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Футбол" />
            Футбол
          </label>
        </div>
                <div className="filter-group">
          <label>
            <input type="checkbox" name="Тренування" />
            Тренування
          </label>
        </div>
        <div className="filter-group">
         <label>
            <input type="checkbox" name="Йога" />
            Йога
         </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Баскетбол" />
            Баскетбол
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Бейсбол" />
            Бейсбол
          </label>
        </div>
                <div className="filter-group">
          <label>
            <input type="checkbox" name="Гольф" />
            Гольф
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Скейтбординг" />
            Скейтбординг
          </label>
        </div>
                <div className="filter-group">
          <label>
            <input type="checkbox" name="Ходьба" />
            Ходьба
          </label>
        </div>
        <div className="filter-group">
         <label>
            <input type="checkbox" name="Волейбол" />
            Волейбол
         </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Плавання" />
            Плавання
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" name="Танець" />
            Танець
          </label>
        </div>
      </form>
    </div>
  );
}

export default FilterSidebar;
