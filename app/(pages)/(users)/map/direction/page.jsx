"use client";
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
import { useRouter } from "next/navigation";
import Head from "next/head";

const libraries = ["places"]; // Optional for place search

const MyMapComponent = () => {
  const router = useRouter();
  const [nonce, setNonce] = useState("");
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState({
    lat: 7.1762595,
    lng: 4.7280668,
  }); // Your origin coordinates
  const [destination, setDestination] = useState({
    lat: 7.1762595,
    lng: 4.7120668,
  }); // Your destination coordinates
  const [travelMode, setTravelMode] = useState("driving"); // Initial travel mode
  const [directions, setDirections] = useState(null); // Stores directions response

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeQLtnNDROKSSqq_k3nQ_NTpnsv7srU_Y",
    libraries,
  });

  console.log(isLoaded, directions);

  const directionsService =
    isLoaded && new window.google.maps.DirectionsService(); // Directions service instance

  useEffect(() => {
    // Generate a random nonce value
    const newNonce = Math.random().toString(36).substring(2, 15);
    setNonce(newNonce);
  }, [router.asPath]);

  useEffect(() => {
    if (isLoaded && origin && destination) {
      calculateDirections();
    }
  }, [map, origin, destination, isLoaded]); // Run when dependencies change

  const calculateDirections = () => {
    console.log("here");
    const request = {
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(
        destination.lat,
        destination.lng
      ),
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (response, status) => {
      console.log(status, response);
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(response);
      } else {
        console.error("Directions request failed:", status);
      }
    });
  };

  const customMapStyle = [
    // Replace with your custom map style JSON
    {
      featureType: "poi.business",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
  ];

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`script-src 'self' https://maps.googleapis.com https://*.googleapis.com 'nonce-${nonce}' 'unsafe-inline';`}
        />
      </Head>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "800px" }}
        zoom={12} // Adjust zoom level as needed
        center={origin} // Center on origin for better visualization
        options={{
          styles: customMapStyle, // Apply custom map style
          fullscreenControl: true,
        }}
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
