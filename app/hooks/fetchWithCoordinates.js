import useSWR from "swr";
import useGeolocation from "./useGeolocation";
import { useEffect, useState } from "react";

const useSWRWithCoordinates = (url) => {
const { coordinates: { latitude: lat, longitude: lng }, loading } = useGeolocation()
const [isset, setCoord] = useState("")

useEffect(() => {
    setCoord(lat?.toFixed(4))
}, [lat?.toFixed(4)])

  const { data, error, isLoading } = useSWR(isset && [url, lat, lng]);
  return {
    data,
    error,
    isLoading: !error && !data,
    status: !isset ? "Getting your current location" : "Loading data...",
    isset,
    lat,
    lng

  };
};

export default useSWRWithCoordinates
