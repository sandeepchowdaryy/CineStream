import React from "react";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Footer from "./Footer";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { Search } from "./Search";
import { useSelector } from "react-redux";
import ShimmerBrowse from "./ShimmerBrowse";

function Browse() {
  const showsearch = useSelector((store) => store.search.showsearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies();
  const movies = useSelector((store) => store.movies?.nowplayingmovies);
  
  return movies?.length === 0 ?  <ShimmerBrowse/> : (
    
    <div>
      
      {showsearch ? (
        <Search />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
          <Footer/>
        </>
      )}
    </div>
  );
}

export default Browse;
