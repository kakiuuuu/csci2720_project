import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "./FlexBetween";
// import Friend from "components/Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenue, setUser } from "state";
import { Link, useNavigate, redirect } from "react-router-dom";
import _ from 'lodash'

const VenueWidget = ({
  _id,
  venueId,
  events,
  latitude,
  longitude,
  name,
  comments,
}) => {
  // const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);
  const [isLiked, setIslike] = useState(false)
  // const isLiked = Boolean(likes[loggedInUserId]);

  let { username, favouriteLocation } = loggedInUser
  const { typography, palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

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
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Box display="flex" justifyContent= "normal">
          <img
            width="25%"
            height="auto"
            alt="venues"
            style={{ borderRadius: "0.75rem"}}
            src={"../assets/cuhk.png"}
          />
          <Box px={4}>
            <Typography color={main} sx={{ mt: "1rem",  ...typography.h2}}>
              {name}
            </Typography>
            <Typography color={main}>
              Number of event: {events}
            </Typography>
            <Button
              variant="contained" 
              onClick={() => navigate(`/venue/${venueId}`)}
            >
              More Detail
            </Button>
          </Box>
        </Box>

        <Box display="flex" justifyContent="end">
          <IconButton onClick={patchLike} >
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
        </Box>
      </FlexBetween>
      
    </WidgetWrapper>
  );
};

export default VenueWidget;
