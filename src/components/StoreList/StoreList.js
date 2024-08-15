import React, { useState, useEffect } from 'react';

const StoreList = ({ cityFilter, onFilteredStoresChange }) => {
  const [stores] = useState([
{
    name: 'Planet Sports',
    address: 'Київ, вул. Центральна, 11',
    city: 'Київ',
    isOpen: false,
    openingHours: 'відкриється завтра о 9:00',
    lat: 50.3903037,
    lng: 30.6037083,
  },
  {
    name: 'Planet Sports',
    address: 'Київ, вул. Магістральна, 7',
    city: 'Київ',
    isOpen: true,
    openingHours: 'зачиниться о 22:00',
    lat: 50.4501,
    lng: 30.5244,
  },
  {
    name: 'Planet Sports',
    address: 'Дніпро, вул. Олеся Гончара, 2',
    city: 'Дніпро',
    isOpen: false,
    openingHours: 'відкриється завтра о 9:00',
    lat: 48.4647,
    lng: 35.0462,
  },
  {
    name: 'Planet Sports',
    address: 'Львів, вул. Староміська, 6',
    city: 'Львів',
    isOpen: false,
    openingHours: 'відкриється завтра о 9:00',
    lat: 49.8397,
    lng: 24.0297,
  },
  {
    name: 'Planet Sports',
    address: 'Одеса, вул. Гоголя, 4',
    city: 'Одеса',
    isOpen: false,
    openingHours: 'відкриється завтра о 9:00',
    lat: 46.4825,
    lng: 30.7233,
  },
  {
    name: 'Planet Sports',
    address: 'Дніпро, вул. Василя Чапленка, 8',
    city: 'Дніпро',
    isOpen: false,
    openingHours: 'відкриється завтра о 9:00',
    lat: 48.4647,
    lng: 35.0462,
  },
  ]);

  // Фильтруем магазины по городу
  const filteredStores = stores.filter(store => store.city.includes(cityFilter));

  // Сообщаем отфильтрованные магазины в MapPage
  useEffect(() => {
    onFilteredStoresChange(filteredStores);
  }, [filteredStores, onFilteredStoresChange]);

  return (
    <div>
      {filteredStores.map((store, index) => (
        <div key={index} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <h4>{store.name}</h4>
          <p>{store.address}</p>
          <p style={{ color: store.isOpen ? 'green' : 'red' }}>
            {store.isOpen ? 'Відчинено' : 'Зачинено'}: {store.openingHours}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
