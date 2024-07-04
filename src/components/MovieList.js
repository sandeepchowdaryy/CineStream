import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ name, movies }) => {
  //console.log(movies);
  return (
    <div>
      <div className="pl-6 pb-10">
        <h1 className="text-3xl font-bold my-5">{name}</h1>
        <div className="flex overflow-x-scroll overflow-y-hidden">
          <div className="flex gap-4 ">
            {movies?.map((movie) => (
              <MovieCard key={movie.div} posterPath={movie?.poster_path} title= {movie?.title} releaseDate = {movie?.release_date} vote_average={movie?.vote_average}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
