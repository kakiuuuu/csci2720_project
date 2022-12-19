import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
  } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
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
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { typography, palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="2rem 1rem">
      <Divider />
      <FlexBetween>
        <Box>
          <Typography color={main} sx={{ mt: "1rem",  ...typography.h3}}>
            {title}
          </Typography>
          <Typography color={main}>
            date : {date ? date : "/"} <br/>
            Price: {price ? price : "/"} <br/>
            presenter: {presenter ? presenter : "/"} <br/>
            description: {description ? description : "/"}
          </Typography>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default EventWidget;