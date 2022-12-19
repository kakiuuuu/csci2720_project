import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
// import Friend from "components/Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenue, setUser } from "state";
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
      {/* {isComments && (
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
      )} */}
    </WidgetWrapper>
  );
};

export default VenueWidget;
