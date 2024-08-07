import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  console.log(movies);

  return (
    movies?.nowplayingmovies && (
      <div className=" text-white bg-black ">
        <div className=" md:ml-16 ml-3 md:-mt-56  -mt-[4rem] relative z-20">
          <MovieList
            name={"Now Playing"}
            movies={movies?.nowplayingmovies}
            type={"movie"}
          />
          <MovieList
            name={"Trending"}
            movies={movies?.trendingmovies}
            type={"movie"}
          />
          <MovieList
            name={"TopRated Movies"}
            movies={movies?.topmovies}
            type={"movie"}
          />

          <MovieList
            name={"Popular"}
            movies={movies?.popularmovies}
            type={"movie"}
          />
          <MovieList
            name={"Upcomming"}
            movies={movies?.upcomingmovies}
            type={"movie"}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
