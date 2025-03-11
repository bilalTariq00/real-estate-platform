import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet"; 

export default function ZoomToLocation({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 17, { animate: true, duration: 1.5 }); 
  }, [position, map]);
  return null;
}
