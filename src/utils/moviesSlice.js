import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowplayingmovies: null,
    trailervideo: null,
    popularmovies: null,
    topmovies: null,
    upcomingmovies: null,
    trendingmovies: null,
    similarmovies:null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowplayingmovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularmovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailervideo = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topmovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingmovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingmovies = action.payload;
    },
    addSimilarMovies: (state,action) => {
      state.similarmovies = action.payload;
    }
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrendingMovies,
  addMovieDetails,
  addSimilarMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
