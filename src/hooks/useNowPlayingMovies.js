import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const isrendered = useSelector((store) => store.movies.nowplayingmovies);

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_Options
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
   !isrendered && NowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
