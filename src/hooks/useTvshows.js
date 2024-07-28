import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";
const useTvshows = () => {
  const [moviedetails, setmoviedetails] = useState(null);

  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
      API_Options
    );
    const json = await data.json();
    console.log(json);
    setmoviedetails(json);
    // dispatch(addMovieDetails(jsons));
  };

  useEffect(() => {
    NowPlayingMovies();
  }, []);

  return moviedetails;
};

export default useTvshows;
