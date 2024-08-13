// hooks/useGeolocation.js

import { useState, useEffect } from 'react';

const useGeolocation = (interval = 120000) => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    const updateCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 120000,
          maximumAge: 0,
        }
      );
    };

    updateCoordinates(); // Initial call
    const intervalId = setInterval(updateCoordinates, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [interval]);

  return { coordinates, loading, error };
};

export default useGeolocation;
