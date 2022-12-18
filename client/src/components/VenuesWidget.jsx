import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenues } from "state";
import PostWidget from "./VenueWidget";

const VenuesWidget = ({ username, MyfavouritePage = false }) => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues);
  const token = useSelector((state) => state.token);

  const getVenues = async () => {
    const response = await fetch("http://localhost:3001/api/venues", {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setVenues({ venues: data }));
  };

  const getUserVenues = async () => {
    const response = await fetch(
      `http://localhost:3001/venues/${username}`,
      {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setVenues({ venues: data }));
  };

  useEffect(() => {
    if (MyfavouritePage) {
      getUserVenues();
    } else {
      getVenues();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {venues.map(
        ({
          _id,
          venueId,
          events,
          latitude,
          longitude,
          name,
          comments,
        }) => (
          <PostWidget
            key={_id}
            venueId={venueId}
            events={events}
            latitude={latitude}
            longitude={longitude}
            name={name}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default VenuesWidget;
