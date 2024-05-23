"use client";
import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  LoadScriptError,
} from "@react-google-maps/api";

const libraries = ["places"]; // Optional for additional features like place search

const MyMapComponent = () => {
  const [map, setMap] = useState(null);
  const center = {
    lat: 7.1762595,
    lng: 4.7280668,
  }; // Your desired center coordinates
  const zoom = 20; // Your desired zoom level

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAc1nh-S1_hL3n_sLzzR-tLkgOy9PHenHQ", // API key from environment variable
    libraries,
  });

  useEffect(() => {
    // if (isLoaded && window) {
    //   const mapInstance = window.google?.maps?.Map(
    //     document.getElementById("map"),
    //     { center, zoom }
    //   );
    //   setMap(mapInstance);
    // }
  }, [isLoaded]);

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }} // Adjust dimensions as needed
        zoom={zoom}
        center={center}
      />
    </div>
  );
};

export default MyMapComponent;