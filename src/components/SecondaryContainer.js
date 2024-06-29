import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  console.log(movies);

  return (
    movies?.nowplayingmovies && (
      <div className=" text-white bg-black ">
        <div className=" ml-10 -mt-56 relative z-20">
          <MovieList name={"Now Playing"} movies={movies?.nowplayingmovies} />
          <MovieList name={"TopRated Movies"} movies={movies?.topmovies} />
          <MovieList name={"Trending"} movies={movies?.trendingmovies} />
          <MovieList name={"Popular"} movies={movies?.popularmovies} />
          <MovieList name={"Upcomming"} movies={movies?.upcomingmovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
