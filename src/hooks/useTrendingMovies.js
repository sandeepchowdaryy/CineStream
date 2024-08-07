import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies, addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const isrendered = useSelector((store) => store.movies.trendingmovies);
  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      API_Options
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    !isrendered && NowPlayingMovies();
  }, []);
};

export default useTrendingMovies;
