import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  venues: [],
  sort: "",
  search: "",
};

export const appSlice = createSlice({
  name: "app",
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
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setEvent: (state, action) => {
      const updatedEvents = state.events.map((event) => {
        if (event._id === action.payload.event._id) return action.payload.event;
        return event;
      });
      state.events = updatedEvents;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
    },
    setSearch: (state, action) => {
      state.search = action.payload.search;
    },
  },
});

export const { setLogin, setLogout, setVenues, setVenue, setEvents, setEvent, setSort, setSearch } =
  appSlice.actions;
export default appSlice.reducer;
