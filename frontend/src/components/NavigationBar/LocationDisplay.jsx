import React from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const LocationDisplay = ({ location, loading, showFullAddress, setShowFullAddress, truncateAddress }) => {
  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => location && setShowFullAddress(!showFullAddress)}
      >
        <MapPin className="h-5 w-5 text-red-500" />
        <span className="text-sm">
          {loading ? 'Getting location...' : location ? truncateAddress(location) : 'Select Location'}
        </span>
        {location && (
          <button 
            className="ml-1 p-1 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setShowFullAddress(!showFullAddress);
            }}
          >
            {showFullAddress ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </button>
        )}
      </div>
      {showFullAddress && location && (
        <div className="absolute top-full mt-2 p-3 bg-white shadow-lg rounded-md max-w-xs z-10">
          <p className="text-sm">{location}</p>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;