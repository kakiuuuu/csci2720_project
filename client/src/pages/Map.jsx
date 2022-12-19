import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import MapWidget from "../components/MapWidget"
function initMap(){}
const Map = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username } = useSelector((state) => state.user);
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
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <MapWidget locations={locations}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Map;


