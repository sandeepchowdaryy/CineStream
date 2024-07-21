import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchtext:null,
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
    addsearchtext :(state,action) => {
      state.searchtext = action.payload;
    },
  },
});

export const { toggleSearchBtnEvent, addSearchMovieResult ,addsearchtext} =
  searchSlice.actions;

export default searchSlice.reducer;
