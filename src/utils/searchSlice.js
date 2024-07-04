import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    showsearch: false,
    searchMovies: null,
  },
  reducers: {
    toggleSearchBtnEvent: (state) => {
      state.showsearch = !state.showsearch;
    },
    addSearchMovieResult: (state, action) => {
      state.searchMovies = action.payload;
    },
  },
});

export const { toggleSearchBtnEvent, addSearchMovieResult } =
  searchSlice.actions;

export default searchSlice.reducer;
