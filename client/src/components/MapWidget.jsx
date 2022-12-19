import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const MapWidget = () => {
  
    const locations = [
        {
            name: "Location 1",
            location: { 
              lat: 22.29386,
              lng: 114.17053
            },
          },
          {
            name: "Location 2",
            location: { 
              lat: 22.44152,
              lng: 114.02289
            },
          },
          {
            name: "Location 3",
            location: { 
              lat: 22.35665,
              lng: 114.12623
            },
          },
          {
            name: "Location 4",
            location: { 
              lat: 22.501639,
              lng: 114.128911
            },
          },
          {
            name: "Location 5",
            location: { 
              lat: 22.31368,
              lng: 114.18556
            },
          },
          {
            name: "Location 6",
            location: { 
              lat: 22.334583,
              lng: 114.208766
            },
          },
          {
            name: "Location 7",
            location: { 
              lat: 22.38136,
              lng: 114.1899
            },
          },
          {
            name: "Location 8",
            location: { 
              lat: 22.28602,
              lng: 114.14967
            },
          },
          {
            name: "Location 9",
            location: { 
              lat: 22.39181,
              lng: 113.976771
            },
          },
      ];

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