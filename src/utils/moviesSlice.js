import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowplayingmovies : null,
    },
    reducers : {
        addNowPlayingMovies : (state,action) => {
            state.nowplayingmovies = action.payload;
        },
    },

});

export const {addNowPlayingMovies} = moviesSlice.actions;
export default moviesSlice.reducer;