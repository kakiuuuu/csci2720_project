import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import PostWidget from "./EventWidget";

const EventsWidget = ({ username, MyfavouritePage = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);

  const getEvents = async () => {
    const response = await fetch("http://localhost:3001/api/events", {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
    });
    console.log("yoyo",response)
    const data = await response.json();
    console.log(data)
    dispatch(setEvents({ events: data }));
  };

  useEffect(() => {
 
      getEvents();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {events.map(
        ({
          _id,
          eventId,
          date,
          description,
          presenter,
          price,
          title,
          venueId,
        }) => (
          <PostWidget
            key={_id}
            eventId={eventId}
            date={date}
            description={description}
            presenter={presenter}
            price={price}
            title={title}
            venueId={venueId}
          />
        )
      )}
    </>
  );
};

export default EventsWidget;