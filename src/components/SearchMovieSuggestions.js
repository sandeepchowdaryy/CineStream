import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";

const SearchMovieSuggestions = () => {
  const { searchMovies } = useSelector((store) => store.search);
  const movies = useSelector((store) => store.movies);

  return (
    <div className="pl-24 bg-black pt-10 pb-20 text-white overflow-hidden">
      <div className="">
        {searchMovies && (
          <h1 className="text-3xl font-bold pb-10">Search Results</h1>
        )}
        <div className="flex  ">
          <div className="flex flex-wrap gap-7 w-screen">
            {searchMovies?.map((movie) => (
              <MovieCard
                key={movie.div}
                posterPath={movie?.poster_path}
                title={movie?.title}
                releaseDate={movie?.release_date}
                vote_average={movie?.vote_average}
              />
            ))}
          </div>
        </div>
      </div>
      {!searchMovies && (
        <MovieList name={"Trending"} movies={movies?.trendingmovies} />
      )}
    </div>
  );
};

export default SearchMovieSuggestions;
