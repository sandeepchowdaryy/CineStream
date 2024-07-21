import userReducer  from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice"; 
import searchReducer from "./searchSlice";
import detailsReducer from "./detailsSlice";

const appStore = configureStore({
  reducer: {
    user : userReducer,
    movies: moviesReducer,
    search : searchReducer,
    details : detailsReducer,
  }, 
});

export default appStore;
