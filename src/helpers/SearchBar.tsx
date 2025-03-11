import { useState, useEffect, useCallback } from "react";

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query) return;

    const localFiltered = properties.filter((property) =>
      property.title.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(localFiltered); 
    setDropdownOpen(localFiltered.length > 0);

    try {
      const res = await fetch(`/api/properties?title=${query}`);
      if (res.ok) {
        const apiResults: Property[] = await res.json();

        const uniqueResults = [...localFiltered, ...apiResults].filter(
          (property, index, self) =>
            index === self.findIndex((p) => p._id === property._id)
        );

        setSuggestions(uniqueResults);
        setDropdownOpen(uniqueResults.length > 0);
      }
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  },[properties]);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
        setDropdownOpen(false);
      }
    }, 300); 

    return () => clearTimeout(delayFetch);
  }, [searchTerm,fetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchProperties(searchTerm);
      setDropdownOpen(false); 
    }
  };

  const handleSuggestionClick = (property: Property) => {
    setSearchTerm(property.title);
    setSelectedPosition([property.latitude, property.longitude]);
    fetchProperties(property.title);
    setDropdownOpen(false);
  };

  return (
    <div className="relative flex justify-center my-4">
      <input
        type="text"
        placeholder="Search properties..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-72 shadow placeholder-black border-gray-300 hover:border-purple-400 focus:border-purple-600 transition"
      />

      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-72 bg-white border rounded shadow-lg z-50 max-h-60 overflow-y-auto text-black">
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
