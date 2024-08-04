import { useCallback } from 'react';
import useGeolocation from './useGeolocation'; // Adjust the path as needed
import { jsonHeader } from '../redux/state/slices/api/setAuthHeaders';
import martApi from "@/app/redux/state/slices/api/baseApi";


const useFetcher = () => {
  const { coordinates, loading } = useGeolocation(10000); // Adjust the interval as needed

  const fetcher = useCallback(async (resource, init) => {
    if (loading) {
      return null; // Return null or a default value if coordinates are not available yet
    }
        console.log(coordinates)
    if (!coordinates.latitude || !coordinates.longitude) {
      throw new Error('Coordinates are not available yet');
    }

    const currentSearchParams = new URLSearchParams(resource);
    currentSearchParams.set('lat', coordinates.latitude);
    currentSearchParams.set('long', coordinates.longitude);
    const getToken = jsonHeader('user');
    console.log(resource)
    const res = await martApi.get(resource, getToken);
    return res.data;
  }, [coordinates, loading]);

  return fetcher;
};

export default useFetcher;
