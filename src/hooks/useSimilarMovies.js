import { useDispatch } from "react-redux";
import { addPopularMovies, addSimilarMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useSimilarMovies = (movieId) => {
  const dispatch = useDispatch();

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+ movieId +"/similar?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addSimilarMovies(json.results));
  };
  
  useEffect(() => {
    if (movieId) {
      NowPlayingMovies();
    }
  }, [movieId]);
};

export default useSimilarMovies;
