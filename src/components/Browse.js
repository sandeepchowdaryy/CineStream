import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { Search } from "./Search";
import { useSelector } from "react-redux";

function Browse() {
  const showsearch = useSelector((store) => store.search.showsearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies();
  return (
    <div>
      <Header />
      {showsearch ? (
        <Search />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
}

export default Browse;
