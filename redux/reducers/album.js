import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    name: "",
  },
  reducers: {
    FETCH_ALBUMS(state, action) {
      state.name = action.payload;
    },
  },
});

export const { FETCH_ALBUMS } = albumSlice.actions;

export default albumSlice.reducer;
