import { createSlice } from "@reduxjs/toolkit";
import useMovieCrew from "../hooks/useMovieCrew";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    movieDetails: null,
    moviecrew:null,
  },
  reducers: {
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    addMovieCrew:(state,action) => {
      state.moviecrew = action.payload;
    },
  },
});

export const { addMovieDetails,addMovieCrew } = detailsSlice.actions;
export default detailsSlice.reducer;
