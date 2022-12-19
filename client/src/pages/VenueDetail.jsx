import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  InputBase,
  Typography,
  IconButton,
  Divider,
  InputLabel,
  Button
} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import EventsWidget from '../components/EventsWidget'
import MapWidget from "../components/MapWidget"
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenue, setUser } from "state";
import { Routes, Route, useParams } from 'react-router-dom';
import _ from 'lodash'

const VenueDetail = (props) => {

  const [isComments, setIsComments] = useState(false);
  const [isLiked, setIslike] = useState(false)
  const [detail, setDetail] = useState({
    _id: "",
    events: 0,
    latitude: 0,
    longitude: 0,
    name: "",
    comments: [],
  })
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const loggedInUser = useSelector((state) => state.user);
  let { username, favouriteLocation } = loggedInUser

  const { typography, palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  let { venueId } = useParams()
  console.log('state>>>', state)
  
  let venueMap = _.keyBy(state.venues, "venueId")
  // setDetail(venueMap[venueId])

  console.log('venueMap[venueId]>>>>', venueMap[venueId])
  let {
    _id,
    events,
    latitude,
    longitude,
    name,
    comments,
  } = venueMap[venueId]
  let locations = [{location: {lat:latitude, lng:longitude }}]

  useEffect(() => {
    setIslike(false)
    if(_.includes(favouriteLocation, _id))
      setIslike(true)
  }, [favouriteLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/api/users/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked, _id, username }),
    });
    const updatedUser = await response.json();
    dispatch(setUser({ user: updatedUser }));
  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="block"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box>
          <WidgetWrapper m="2rem 0">
            <FlexBetween>
              <img
                width="25%"
                height="auto"
                alt="venues"
                style={{ borderRadius: "0.75rem"}}
                src={"../assets/cuhk.png"}
              />
              <Box>
                <Typography color={main} sx={{ mt: "1rem",  ...typography.h1}}>
                  {name}
                </Typography>
                <Typography color={main}>
                  Number of event: {events}
                </Typography>
              </Box>
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            </FlexBetween>
            {/* Event */}
            <EventsWidget venueId={venueId}/>
            {/* Map */}
            <MapWidget locations={locations} />
            {/* comment */}
            {isComments && (
              <Box mt="0.5rem">
                {comments.map((comment, i) => (
                  <Box key={`${name}-${i}`}>
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      {comment}
                    </Typography>
                  </Box>
                ))}
                <Divider />
              </Box>
            )}
          </WidgetWrapper>
        </Box>
      </Box>
    </Box>
  )
};

export default VenueDetail;
