import React, { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa";

function MapBox({ location }) {
  //mapbox geocoder api for coordinates
  const MAPBOX_COORDINATE_RETRIEVAL_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACESS_TOKEN}`;

  const [locationCoordinates, setLocationCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef();

  const getActivityLocation = async () => {
    const res = await fetch(MAPBOX_COORDINATE_RETRIEVAL_URL);
    const result = await res.json();
    setLocationCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1]
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (location) {
      console.log(location);
      getActivityLocation();
    }
  }, [location]);

  useEffect(() => {
    if (!isLoading) {
      mapRef.current?.flyTo({
        center: [locationCoordinates?.lng, locationCoordinates?.lat],
        duration: 5500
      });
    }
  }, [isLoading]);

  return (
    <div className="max-w-[700px] object-cover rounded-md overflow-hidden mx-auto w-[90%] lg:w-3/5 border-[0.1rem]  border-slate-500 shadow-md shadow-slate-400">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACESS_TOKEN}
        initialViewState={{
          longitude: -122.431297,
          latitude: 37.773972,
          zoom: 8
        }}
        style={{ width: "100%", height: 550, borderRadius: 10 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {!isLoading && (
          <Marker
            longitude={locationCoordinates?.lng}
            latitude={locationCoordinates?.lat}
            anchor="bottom"
          >
            <FaMapPin color="#0356fc" size={32} />
          </Marker>
        )}
      </Map>
    </div>
  );
}

export default MapBox;
