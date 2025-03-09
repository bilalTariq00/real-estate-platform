import { useState, useEffect } from "react";

interface Property {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  properties: Property[];
  fetchProperties: (search: string) => void;
  setSelectedPosition: (position: [number, number]) => void;
}

export default function SearchBar({ properties, fetchProperties, setSelectedPosition }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Property[]>([]);

  // Function to fetch properties dynamically
 const fetchSuggestions = async (query: string) => {
  if (!query) return setSuggestions([]);

  // Filter from existing properties
  const localFiltered = properties.filter((property) =>
    property.title.toLowerCase().includes(query.toLowerCase())
  );

  setSuggestions(localFiltered); // Update local suggestions

  try {
    const res = await fetch(`/api/properties?title=${query}`);
    if (res.ok) {
      const apiResults: Property[] = await res.json();

      // Remove duplicates based on _id
      const uniqueResults = [...localFiltered, ...apiResults].filter(
        (property, index, self) =>
          index === self.findIndex((p) => p._id === property._id)
      );

      setSuggestions(uniqueResults);
    }
  } catch (error) {
    console.error("Error fetching properties", error);
  }
};

  // Handle input change and trigger search
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  // Handle search when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchProperties(searchTerm);
      setSuggestions([]); // Hide suggestions after search
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (property: Property) => {
    setSearchTerm(property.title);
    setSelectedPosition([property.latitude, property.longitude]); // Move to selected location
    fetchProperties(property.title);
  };

  return (
    <div className="relative flex justify-center my-4">
      <input
        type="text"
        placeholder="Search properties..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-72 shadow placeholder-white border-white hover:border-purple-200"
      />

      {/* 🔽 Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-72 bg-white border rounded shadow-lg z-50">
          {suggestions.map((property) => (
            <li
              key={property._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(property)}
            >
              {property.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
