import { useDispatch } from "react-redux";
import { addSimilatTvshows } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";

const useSimilarTvShows = (movieId) => {
  const dispatch = useDispatch();

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/"+ movieId +"/similar?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addSimilatTvshows(json.results));
  };
  
  useEffect(() => {
    if (movieId) {
      NowPlayingMovies();
    }
  }, [movieId]);
};

export default useSimilarTvShows;
