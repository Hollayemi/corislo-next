"use client"
import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }) {
  const mapRef = useRef(null);
  const [googleMap, setGoogleMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        console.log(status)
        if (status === "OK") {
          const map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
          });
          setGoogleMap(map);

          new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    });
  }, [address]);

  return <div style={{ height: "400px" }} ref={mapRef} />;
}

function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />
    </div>
  );
}

export default MyPage;
