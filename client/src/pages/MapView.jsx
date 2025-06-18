import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
  const htuLocation = [31.978611, 35.837222]; // HTU in Business Park

  useEffect(() => {
    document.title = "Map | HTU Lost & Found";
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">HTU Location</h2>
      <MapContainer center={htuLocation} zoom={16} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={htuLocation}>
          <Popup>HTU - King Hussein Business Park, Amman, Jordan</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;