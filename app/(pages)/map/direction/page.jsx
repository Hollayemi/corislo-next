"use client"
import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  LoadScriptError,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

const libraries = ["places"]; // Optional for place search

const MyMapComponent = () => {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState({ lat: -34.397, lng: 150.644 }); // Your origin coordinates
  const [destination, setDestination] = useState({
    lat: -33.8688,
    lng: 151.2093,
  }); // Your destination coordinates
  const [travelMode, setTravelMode] = useState("driving"); // Initial travel mode
  const [directions, setDirections] = useState(null); // Stores directions response

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

  const directionsService = window && new window.google.maps.DirectionsService(); // Directions service instance

  useEffect(() => {
    if (isLoaded && map && origin && destination) {
      calculateDirections();
    }
  }, [map, origin, destination, isLoaded]); // Run when dependencies change

  const calculateDirections = () => {
    const request = {
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(
        destination.lat,
        destination.lng
      ),
      travelMode: travelMode, // driving, bicycling, transit, walking
    };
    directionsService.route(request, (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(response);
      } else {
        console.error("Directions request failed:", status);
      }
    });
  };

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={12} // Adjust zoom level as needed
        center={origin} // Center on origin for better visualization
      >
        <Marker position={origin} /> {/* Origin marker */}
        <Marker position={destination} /> {/* Destination marker */}
        {directions && <DirectionsRenderer directions={directions} />}{" "}
        {/* Render directions */}
        {/* ... other map components */}
      </GoogleMap>
      {/* Controls for origin, destination, and travel mode (optional) */}
    </div>
  );
};

export default MyMapComponent;
