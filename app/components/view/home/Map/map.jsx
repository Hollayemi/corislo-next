"use client";
import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
  MarkerLabel,
} from "@react-google-maps/api";
import { BriefStoreOnMap } from "./components";
import { useRouter } from "next/navigation";
import Head from "next/head";

const libraries = ["places"]; // Optional for additional features

const MapGraph = ({ mapType, markers }) => {
  const router = useRouter();
  const [nonce, setNonce] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState({
    lat: 7.1762595,
    lng: 4.7280668,
    info: "Kemon-market",
  });
  const center = {
    lat: 7.1762595,
    lng: 4.7280668,
  }; // Your desired center coordinates
  const zoom = 15; // Your desired zoom level

  const mapTypes = {
    default: window.google?.maps?.MapTypeId?.ROADMAP,
    satallite: window.google?.maps?.MapTypeId?.SATELLITE, // Add other types as needed
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

  console.log(mapType, mapTypes["default"]);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker === selectedMarker ? null : marker); // Toggle selected marker
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAc1nh-S1_hL3n_sLzzR-tLkgOy9PHenHQ",
    libraries,
  });

  useEffect(() => {
    // Generate a random nonce value
    const newNonce = Math.random().toString(36).substring(2, 15);
    setNonce(newNonce);
  }, [router.asPath]);

  useEffect(() => {
    if (map && markers.length > 0 && isLoaded) {
      // Create markers and cluster them
      const googleMarkers = markers.map((marker) => {
        return new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map,
        });
      });

      const markerCluster = new MarkerClusterer({
        markers: googleMarkers,
        map,
      });
    }
  }, [map, markers]); // Run only when map or markers change

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="h-screen w-full">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`script-src 'self' https://maps.googleapis.com https://*.googleapis.com 'nonce-${nonce}' 'unsafe-inline';`}
        />
      </Head>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={zoom}
        center={center}
        options={{
          styles: customMapStyle,
          fullscreenControl: false,
          mapTypeId: mapTypes[mapType] || google.maps.MapTypeId.HYBRID,
        }}
      >
        {/* Render markers with optional InfoWindow if needed */}
        {markers.map((marker, i) => (
          <Marker
            key={marker.lat + marker.lng} // Unique key for each marker
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `/images/misc/shop/${i}.png`,
              scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
              origin: new window.google.maps.Point(0, 0), // Position of the icon's sprite in the image
              anchor: new window.google.maps.Point(16, 16), // Anchor point of the icon
            }}
            label={{
              text: "Nifise Cloth Store",
              className: "!text-black !font-bold !mt-14",
            }}
            onClick={() => handleMarkerClick(marker)} // Handle marker click event
          >
            {/* <MarkerLabel
              anchor={new google.maps.Point(24, 0)} // Adjust anchor point if needed
              labelContent={`Nifis Store`} // Replace with marker label text
            /> */}
            {selectedMarker && selectedMarker.lat === marker.lat && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <BriefStoreOnMap
                  branchId={marker.branchId}
                  open={Boolean(i)}
                  image={`/images/misc/shop/${i}.png`}
                  storeView={`/images/more/store-gallery${i + 1}.png`}
                />
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapGraph;
