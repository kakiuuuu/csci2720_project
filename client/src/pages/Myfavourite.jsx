import VenuesWidget from '../components/VenuesWidget'
import Navbar from "../components/navbar";
import {
  Box,
  useMediaQuery,
  InputBase,
  Typography,
  Menu,
  MenuItem,
  InputLabel,
  Button
} from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { setSort } from "state";

const Myfavourite = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username } = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    if(typeof value === "string" ) dispatch(setSort({sort: value}))
  };

  // console.log('state>>>', state)
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
        <Box
          // flexBasis={isNonMobileScreens ? "42%" : undefined}
          // mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box display="flex" justifyContent="end">
            <Button
              id="sort-button"
              onClick={handleClick}
            >
              <InputLabel id="selectSort">
                <SegmentIcon /> Sorting
              </InputLabel>
            </Button>
            <Menu
                id="sortMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
              {[<MenuItem onClick={(e) => handleClose("asce")}>Asce</MenuItem>,
              <MenuItem onClick={(e) => handleClose("desc")}>Desc</MenuItem>]}
            </Menu>
          </Box>
          <VenuesWidget username={username} MyfavouritePage={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Myfavourite;
