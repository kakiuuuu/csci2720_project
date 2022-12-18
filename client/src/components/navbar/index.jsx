import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Home,
  Search,
  Map,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSearch } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [searchValue, setSearchValue] = useState("")
  const { username, isAdmin } = user
  let location = useLocation();

  
  const handleClick = () => {
    // console.log('searchBar.value>>>>', searchValue)
    dispatch(setSearch({search: searchValue}))
  };

  const handleSearchChange = ({ target }) => {
    console.log('target.value>>>>', target.value)
    setSearchValue(target.value);
  };
  
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          <Home sx={{ fontSize: "25px" }} />
        </Typography>
        {/* { location.pathname === '/home' && (
          <> */}
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." name={'searchValue'}  onChange={handleSearchChange}/>
              <IconButton onClick={(e) => handleClick()}>
                <Search onClick={(e) => handleClick()}/>
              </IconButton> 
            </FlexBetween>
          {/* </>
        )} */}
        
      </FlexBetween>

      {/* DESKTOP NAV */}
      <FlexBetween gap="2rem">
        <Link to="/map">
          <Map sx={{ fontSize: "25px" }} />
        </Link>
        <Link to="/favourite">
          <FavoriteBorderOutlined sx={{ fontSize: "25px" }} />
        </Link>
        <FormControl variant="standard" value={username}>
          <Select
            value={username}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              },
            }}
            // input={<InputBase />}
          >
            <MenuItem value={username}>
              <Typography>{username}</Typography>
            </MenuItem>
            { isAdmin && (
              [
                <MenuItem>
                  <Link to="/event">
                    <Typography>Edit Event</Typography>
                  </Link>
                </MenuItem>,
                <MenuItem>
                  <Link to="/user">
                    <Typography>Edit User</Typography>
                  </Link>
                </MenuItem>
              ]
            )}
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
