"use client";

import { useEffect, useState } from "react"

export default function Home() {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | undefined>(undefined)
  const [geolocationError, setGeolocationError] = useState<GeolocationPositionError|undefined>(undefined)

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
    
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setGeolocation(crd)
    }
    
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setGeolocationError(err)
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[])


  return (
    <div>
      Browser geolocation

      {geolocation && (
        <>
          <p>{`Latitude : ${geolocation.latitude}`}</p>
          <p>{`Longitude : ${geolocation.longitude}`}</p>
          <p>{`More or less ${geolocation.accuracy} meters.`}</p>
        </>
      )}

      {geolocationError && (
        <p>{`ERROR(${geolocationError.code}): ${geolocationError.message}`}</p>
      )}
    </div>
  )
}
