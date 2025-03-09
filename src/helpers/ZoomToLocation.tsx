import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ZoomToLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 12, { animate: true, duration: 1.5 });
  }, [position, map]);
  return null;
}
