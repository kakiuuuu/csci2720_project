import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  venues: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // setFriends: (state, action) => {
    //   if (state.user) {
    //     state.user.friends = action.payload.friends;
    //   } else {
    //     console.error("user friends non-existent :(");
    //   }
    // },
    setVenues: (state, action) => {
      state.venues = action.payload.venues;
    },
    setVenue: (state, action) => {
      const updatedVenues = state.venues.map((venue) => {
        if (venue._id === action.payload.venue._id) return action.payload.venue;
        return venue;
      });
      state.venues = updatedVenues;
    },
  },
});

export const { setLogin, setLogout, setVenues, setVenue } =
  authSlice.actions;
export default authSlice.reducer;
