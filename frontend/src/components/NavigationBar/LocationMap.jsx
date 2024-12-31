import React, { useEffect } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ 
  mapRef, 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  handleSearchSelect,
  handleSearch,
  location,
  setShowLocationPopup,
  setShowMap 
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Select Location</h3>
        <button 
          onClick={() => setShowMap(false)} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md pl-10"
          />
          <Search
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {searchResults.length > 0 && (
          <div className="absolute w-full mt-1 z-50">
            <ul className="bg-white shadow-lg rounded-md w-full max-h-48 overflow-y-auto border">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchSelect(result)}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-sm">{result.display_name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div ref={mapRef} className="w-full h-96 rounded-lg mb-4 relative z-0" />

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-start gap-3">
          <MapPin className="h-6 w-6 text-red-500 mt-1" />
          <div>
            <h4 className="font-medium">Selected Location</h4>
            <p className="text-sm text-gray-600">
              {location || 'Move pin to select location'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowLocationPopup(false)}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
