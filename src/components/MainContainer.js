import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowplayingmovies);
  console.log(movies);
  if (!movies) return;
// Get the current index from localStorage or set it to 0 if it doesn't exist
let movieIndex = parseInt(localStorage.getItem('movieIndex'), 9) || 0;
  
// Increment the index
movieIndex = (movieIndex + 1) % movies.length; // Ensure it wraps around if it exceeds the length

// Save the updated index back to localStorage
localStorage.setItem('movieIndex', movieIndex);

const mainMovie = movies[movieIndex];
  console.log(mainMovie);
  
  const {title,overview,backdrop_path} = mainMovie;
  
  return (
    <div className="">
      <VideoTitle title = {title} overview = {overview} />
      <VideoBackground movieId={backdrop_path} />
    </div>
  );
};

export default MainContainer;
