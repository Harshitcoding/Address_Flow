import React from 'react';
import { MapPin, Search, X } from 'lucide-react';
import LocationMap from './LocationMap';

const LocationPopup = ({
  showMap,
  loading,
  handleEnableLocation,
  setShowMap,
  error,
  ...mapProps
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex flex-col items-center">
          {!showMap ? (
            <>
              <div className="relative mb-4">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-red-500" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <X className="h-4 w-4" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">Location permission is off</h2>
              <p className="text-gray-600 mb-6">
                We need your location to find the nearest store & provide you a seamless delivery experience
              </p>

              <button
                onClick={handleEnableLocation}
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 mb-4 disabled:bg-red-300"
              >
                {loading ? 'Getting Location...' : 'Enable Location'}
              </button>

              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search your Location Manually"
                  className="w-full p-3 border rounded-md pl-10"
                  onClick={() => setShowMap(true)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </>
          ) : (
            <LocationMap {...mapProps} setShowMap={setShowMap} />
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;