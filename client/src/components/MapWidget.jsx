import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const MapWidget = (props) => {
  let { locations=[] } = props

  const mapStyles = {        
    height: "400px",
    width: "100%"};
  
  const defaultCenter = {
    lat: 22.40386, lng: 114.17053
  }
  
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAP6nO-PcEkAFQyB1W2mASLk0hers_Dh9U'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}>
        {
          locations.map(item => {
            return (
            <MarkerF key={item.name} position={item.location}/>
            )
          })
        }
      </GoogleMap>
    </LoadScript>
  )
}
export default MapWidget;