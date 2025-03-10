import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet"; // ✅ Import correct Leaflet type

export default function ZoomToLocation({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 14, { animate: true, duration: 1.5 }); // ✅ Increase zoom for better focus
  }, [position, map]);
  return null;
}
