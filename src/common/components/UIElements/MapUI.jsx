import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


// Need to update the API key in index.html
// the google maps SDK is downloaded in index.html script. this adds the google object to the window for use.
const MapUI = props => {  

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
 
  if (!isLoaded) return <div>Loading...</div>;

  return <Map props={props} />;
};


function Map({props}) {
  console.log('propscenterinmap')

  console.log(props.center)
  const center = useMemo(() => (props.center), [props.center]);
 
  return (
    <>
    <h1>{props.center.lat}</h1>
    <GoogleMap zoom={props.zoom} center={center} mapContainerClassName="w-full h-full">
      <Marker position={center} />
    </GoogleMap>
    </>
  );
 }

export default MapUI;