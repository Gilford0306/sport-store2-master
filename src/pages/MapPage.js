import React, { useState } from "react";
import StoreList from "../components/StoreList/StoreList";
import MapComponent from "../components/MapComponent/MapComponent";

const MapPage = () => {
  const [city, setCity] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setCity(city);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        margin: "10px",
      }}
    >
      <div style={{ width: "20%", margin: "10px" }}>
        <input
          type="text"
          placeholder="Місто"
          value={city}
          onChange={handleCityChange}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        {/* StoreList теперь передает отфильтрованные магазины */}
        <StoreList
          cityFilter={city}
          onFilteredStoresChange={setFilteredStores}
        />
      </div>
      <div style={{ width: "70%" }}>
        {/* Передаем отфильтрованный список магазинов в MapComponent */}
        <MapComponent stores={filteredStores} />
      </div>
    </div>
  );
};

export default MapPage;
