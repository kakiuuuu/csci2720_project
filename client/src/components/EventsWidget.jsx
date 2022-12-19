import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import EventWidget from "./EventWidget";

const EventsWidget = ({ venueId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);

  const getEvents = async () => {
    let url = "http://localhost:3001/api/events"
    if(venueId) url += `/venue/${venueId}`

    const response = await fetch(url, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
    });
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
          <EventWidget
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