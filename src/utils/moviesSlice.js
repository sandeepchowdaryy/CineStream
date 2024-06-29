import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowplayingmovies: null,
    trailervideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowplayingmovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailervideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies,addTrailerVideo  } = moviesSlice.actions;
export default moviesSlice.reducer;
