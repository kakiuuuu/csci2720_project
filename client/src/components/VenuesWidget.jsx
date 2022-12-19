import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenues } from "state";
import VenueWidget from "./VenueWidget";
import _ from 'lodash'
import Fuse from 'fuse.js'

const VenuesWidget = ({ username, MyfavouritePage = false }) => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues);
  const token = useSelector((state) => state.token);
  const sort = useSelector((state) => state.sort);
  const search = useSelector((state) => state.search);
  let outputVenues = venues

  const getVenues = async (username) => {
    let url = "http://localhost:3001/api/venues"
    if(username) url += `/${username}`
    console.log('url>>>>', url)
    const response = await fetch(url, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
    });
    console.log("yoyo")
    const data = await response.json();
    console.log(data)
    dispatch(setVenues({ venues: data }));
  };

  const sortVenues = async (data) => {
    let sortedData = data
    if(sort)
      sortedData = _.sortBy(data, ['events'])
    if(sort === 'desc') sortedData = _.reverse(sortedData)
    dispatch(setVenues({ venues: sortedData }));
  };

  const options = {
    includeMatches: true,
    findAllMatches: true,
    threshold: 0.6,
    keys: ["name"]
  };
  
  const searchVenues = async (data) => {
    let searchedData = data
    const fuse = new Fuse(data, options);
    searchedData = fuse.search(search)
    searchedData = _.map(searchedData, 'item')
    console.log('searchedData>>>>', searchedData)

    dispatch(setVenues({ venues: searchedData }));
  };

  useEffect(() => {
    if (MyfavouritePage) {
      getVenues(username);
    } else {
      getVenues();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sortVenues(outputVenues)
  }, [sort]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    searchVenues(outputVenues)
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <VenueWidget
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
