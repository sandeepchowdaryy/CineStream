import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { toggleSearchBtnEvent } from "../utils/searchSlice";

const SearchMovieSuggestions = () => {
  const { searchMovies, searchtext } = useSelector((store) => store.search);
  const movies = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const toogleSearchBtn = () => {
    dispatch(toggleSearchBtnEvent());
  };

  return (
    <div className="pl-5 md:pl-20 bg-black pt-8 pb-20 text-white overflow-hidden ">
      <div className="">
        {searchMovies && (
          <h1 className="text-3xl font-sans pb-10">
            {"Search Results of '" + searchtext + "'"}
          </h1>
        )}
        <div className="flex  ">
          <div className="flex flex-wrap gap-7 w-screen">
            {searchMovies?.map((movie) => (
              <Link to={"/movie/" + movie?.id} onClick={toogleSearchBtn}>
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
      <h1 className="text-3xl font-semibold pb-6">Trending Movies</h1>
      <div className="flex gap-5 overflow-x-scroll no-scrollbar">
        {!searchMovies &&
          movies?.trendingmovies?.map((movie) => (
            <Link to={"/movie/" + movie?.id} onClick={toogleSearchBtn}>
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
  );
};

export default SearchMovieSuggestions;
