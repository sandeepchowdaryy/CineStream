import { useDispatch } from "react-redux";
import { addMovieDetails } from "../utils/detailsSlice";
import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";

const useMovieDetails = (movieId) => {
  const dispatch = useDispatch();
  const [moviedetails, setmoviedetails] = useState(null);

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
      API_Options
    );
    const json = await data.json();
    //console.log(json);
    setmoviedetails(json);
    // dispatch(addMovieDetails(json));
  };

  useEffect(() => {
    if (movieId) {
      NowPlayingMovies();
    }
  }, [movieId]);

  return moviedetails;
};

export default useMovieDetails;
