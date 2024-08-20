import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IconPointer from "../assets/free-icon-pointer.png";

const customIcon = L.icon({
  iconUrl: IconPointer,
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -76],
});

const MapComponent = ({ stores }) => {
  return (
    <MapContainer
      center={[50.4501, 30.5234]}
      zoom={6}
      style={{ height: "950px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stores.map((store, index) => (
        <Marker key={index} position={[store.lat, store.lng]} icon={customIcon}>
          <Popup>{store.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
