"use client";
import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  useGoogleMap,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer"; // Added for clustering

const libraries = ["places"]; // Optional for additional features

const MyMapComponent = () => {
  const [map, setMap] = useState({
    lat: 7.1762595,
    lng: 4.7280668,
    info: "Kemon-market",
  });
  const [markers, setMarkers] = useState([
    { lat: 7.1762595, lng: 4.7280668, info: "Coristen" },
    { lat: -33.8541, lng: 151.2168, info: "Marker 2" },
    { lat: 7.1762393, lng: 4.7280468, info: "Corisio" },
  ]); // Array to store marker data
  const center = { lat: -34.397, lng: 150.644 }; // Your desired center coordinates
  const zoom = 20; // Your desired zoom level

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

//   useEffect(() => {
//     if (map && markers.length > 0) {
//       // Create markers and cluster them
//       if (window.google) {
//         const googleMarkers = markers.map((marker) => {
//           return new window.google.maps.Marker({
//             position: { lat: marker.lat, lng: marker.lng },
//             map,
//           });
//         });
//       }

//       const markerCluster = new MarkerClusterer({
//         markers: googleMarkers,
//         map,
//       });
//     }
//   }, [map, markers]); // Run only when map or markers change

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={zoom}
        center={center}
      >
        {/* Render markers with optional InfoWindow if needed */}
        {markers.map((marker) => (
          <Marker
            key={marker.lat + marker.lng} // Unique key for each marker
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {marker.info && (
              <InfoWindow position={{ lat: marker.lat, lng: marker.lng }}>
                <div className="w-12 h-12 rounded-full">{marker.info}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MyMapComponent;
