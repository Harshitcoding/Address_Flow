// components/NavigationBar/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import L from 'leaflet';
import SearchBar from './SearchBar';
import LocationDisplay from './LocationDisplay';
import LocationPopup from './LocationPopup';
import 'leaflet/dist/leaflet.css';

const NavigationBar = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapPosition, setMapPosition] = useState([19.0760, 72.8777]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const leafletMapRef = useRef(null);

  useEffect(() => {
    if (showMap && !leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView(mapPosition, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);

      markerRef.current = L.marker(mapPosition, { draggable: true }).addTo(leafletMapRef.current);

      markerRef.current.on('dragend', () => {
        const position = markerRef.current.getLatLng();
        updateLocationFromMarker(position.lat, position.lng);
      });
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [showMap]);

  useEffect(() => {
    if (leafletMapRef.current && markerRef.current) {
      leafletMapRef.current.setView(mapPosition, 13);
      markerRef.current.setLatLng(mapPosition);
    }
  }, [mapPosition]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const updateLocationFromMarker = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setLocation(data.display_name);
    } catch (err) {
      setError('Failed to fetch location data');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSelect = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    setMapPosition([lat, lon]);
    setLocation(result.display_name);
    setSearchQuery('');
    setSearchResults([]);
    
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([lat, lon], 13);
    }
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lon]);
    }
  };

  const gotLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      if (!response.ok) throw new Error('Failed to fetch location data');
      const data = await response.json();
      setLocation(data.display_name);
      setMapPosition([latitude, longitude]);
    } catch (err) {
      setError('Failed to fetch location data');
    } finally {
      setLoading(false);
      setShowLocationPopup(false);
    }
  };

  const failedToGetLocation = (error) => {
    setError('Could not get location. Please enable location services.');
    setLoading(false);
  };

  const handleEnableLocation = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGetLocation);
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return address.length > 30 ? `${address.substring(0, 30)}...` : address;
  };

  return (
    <div className="relative">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Logo</span>
          </div>

          <SearchBar />

          <div className="flex items-center gap-4">
            <LocationDisplay 
              location={location}
              loading={loading}
              showFullAddress={showFullAddress}
              setShowFullAddress={setShowFullAddress}
              truncateAddress={truncateAddress}
            />
            <User className="h-6 w-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </nav>

      {showLocationPopup && (
        <LocationPopup 
          showMap={showMap}
          loading={loading}
          handleEnableLocation={handleEnableLocation}
          setShowMap={setShowMap}
          error={error}
          mapRef={mapRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleSearchSelect={handleSearchSelect}
          handleSearch={handleSearch}
          location={location}
          setShowLocationPopup={setShowLocationPopup}
        />
      )}
    </div>
  );
};

export default NavigationBar;