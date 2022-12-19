import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import MapWidget from "../components/MapWidget"
import _ from 'lodash'

const Map = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const venues = useSelector((state) => state.venues);
  const { username } = useSelector((state) => state.user);

  const locations = _.map(venues, (venue)=> {
    let {name, latitude, longitude} = venue
    return {
      name,
      location: {lat: latitude, lng: longitude}
    }
  })
  
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


