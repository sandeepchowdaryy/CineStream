import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_Options
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    NowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
