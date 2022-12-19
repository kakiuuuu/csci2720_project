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
  import { setEvent } from "state";
  
  const EventWidget = ({
    eventId,
    date,
    description,
    presenter,
    price,
    title,
    venueId,
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
      const response = await fetch(`http://localhost:3001/events/${eventId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedEvent = await response.json();
      dispatch(setEvent({ event: updatedEvent }));
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <FlexBetween>
          <img
            width="25%"
            height="auto"
            alt="events"
            style={{ borderRadius: "0.75rem"}}
            src={"../assets/cuhk.png"}
          />
          <Box>
            <Typography color={main} sx={{ mt: "1rem",  ...typography.h1}}>
              {title}
            </Typography>
            <Typography color={main}>
              Price: {price}
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
  
  export default EventWidget;