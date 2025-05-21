// hooks/useOpenCage.js
import { useState } from 'react';
import axios from 'axios';
import useGeolocation from './useGeolocation';

const useOpenCage = () => {
 const apiKey = "1477ac2e6ad1480394905cb28814f5c1";
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const { coordinates: { latitude: lat = 7.3782, longitude: lng = 3.9062 } } = useGeolocation()

  const lat = 7.3782
  const lng = 3.9062
  const getLocationFromCoords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
      );

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const location = {
          formatted: result.formatted,
          components: result.components,
          geometry: {
            lat: result.geometry.lat,
            lng: result.geometry.lng,
          },
        };
        setLocationData(location);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch location data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCoordsFromAddress = async (address) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
      );

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const location = {
          formatted: result.formatted,
          components: result.components,
          geometry: {
            lat: result.geometry.lat,
            lng: result.geometry.lng,
          },
        };
        setLocationData(location);
        return location;
      } else {
        setError('No results found');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch coordinates');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    locationData,
    loading,
    error,
    getLocationFromCoords,
    getCoordsFromAddress,
  };
};

export default useOpenCage;