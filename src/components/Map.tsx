"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import PropertyMarker from "../helpers/PropertyMark";
import ZoomToLocation from "../helpers/ZoomToLocation";
import SearchBar from "../helpers/SearchBar";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

interface Property {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
}

const defaultCenter: LatLngExpression = [30.3753, 69.3451]; // Pakistan center

export default function MapComponent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data: Property[] = await res.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchProperties();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full relative">

      <SearchBar properties={properties} fetchProperties={() => {}} setSelectedPosition={setSelectedPosition} />

      <div className="relative z-0">
        <MapContainer center={defaultCenter} zoom={6} className="h-[500px] w-full rounded-lg shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {selectedPosition && <ZoomToLocation position={selectedPosition as LatLngExpression} />}

          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyMarker key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center p-4">No properties found</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
