import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ name, movies }) => {
  //console.log(movies);
  return (
    <div>
      <div className="pl-6 pb-10">
        <h1 className="text-2xl font-bold my-5">{name}</h1>
        <div className="flex overflow-x-scroll overflow-y-hidden">
          <div className="flex gap-4 ">
            {movies?.map((movie) => (
              <Link to={"/movie/"+movie.id}>
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
    </div>
  );
};

export default MovieList;
