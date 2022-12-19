import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import EventsWidget from '../../components/EventsWidget'
import VenuesWidget from '../../components/VenuesWidget'
import Navbar from "../../components/navbar";

const EventPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username } = useSelector((state) => state.user);

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
          <EventsWidget username={username} />
        </Box>
      </Box>
    </Box>
  );
};

export default EventPage;