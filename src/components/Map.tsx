"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Loader from "./Loader";
import PropertyMarker from "../helpers/PropertyMark";
import ZoomToLocation from "../helpers/ZoomToLocation";
import SearchBar from "../helpers/SearchBar";

interface Property {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  location: string;
}

export default function MapComponent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const defaultCenter: [number, number] = [30.3753, 69.3451]; // Pakistan center

  // Fetch properties
  const fetchProperties = async (search = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/properties?title=${search}`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data: Property[] = await res.json();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full relative">
      {/* 🔍 Search Bar */}
      <SearchBar properties={properties} fetchProperties={fetchProperties} setSelectedPosition={setSelectedPosition} />

      {/* 🗺️ Map Container */}
      <div className="relative z-0">
        <MapContainer center={defaultCenter} zoom={6} className="h-[500px] w-full rounded-lg shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Zoom to selected location */}
          {selectedPosition && <ZoomToLocation position={selectedPosition} />}

          {/* Render Property Markers */}
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
