import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: undefined,
  longitude: undefined,
  searchTerm: undefined,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { Iat, lng } = action.payload;
      state.latitude = Iat;
      state.longitude = lng;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// selectors

export const { setLocation, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
