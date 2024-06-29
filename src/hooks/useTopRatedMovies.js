import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_Options
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    NowPlayingMovies();
  }, []);
};

export default useTopRatedMovies;
