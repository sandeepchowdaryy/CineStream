import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const isrendered = useSelector((store) => store.movies.upcomingmovies);
  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_Options
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
  !isrendered &&  NowPlayingMovies();
  }, []);
};

export default useUpcomingMovies;
