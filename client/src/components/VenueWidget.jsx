import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
// import Friend from "components/Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVenue } from "state";

const VenueWidget = ({
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
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = true
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const { typography, palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/venues/${venueId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedVenue = await response.json();
    dispatch(setVenue({ venue: updatedVenue }));
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
