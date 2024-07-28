import React from "react";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movies() {
  const movies = useMovies();
  console.log(movies);
  return(
  <div className="bg-black text-white">
    <div className="flex ">
      <div className="flex flex-wrap justify-center items-center gap-7 w-screen pt-20">
        {movies?.results?.map((movie) => (
          <Link to={"/movie/" + movie?.id} onClick={""}>
            <MovieCard
              key={movie.div}
              posterPath={movie?.poster_path}
              title={movie?.title}
              releaseDate={movie?.release_date}
              vote_average={movie?.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Movies;
