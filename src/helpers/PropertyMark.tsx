import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface Property {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
}

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PropertyMarker({ property }: { property: Property }) {
  return (
    <Marker position={[property.latitude, property.longitude]} icon={customIcon}>
      <Popup>
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <p className="text-sm">🌍 Latitude: {property.latitude}</p>
        <p className="text-sm">🌍 Longitude: {property.longitude}</p>
      </Popup>
    </Marker>
  );
}
