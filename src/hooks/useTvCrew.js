import { useDispatch } from "react-redux";
import { addMovieCrew } from "../utils/detailsSlice";
import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";

const useTvCrew = (movieId) => {
  const [moviecrew , setmoviecrew] = useState();
  const NowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/"+ movieId +"/credits?language=en-US",
      API_Options
    );
    const json = await data.json();
  //  console.log(json);
    // dispatch(addMovieCrew(json));
    setmoviecrew(json);
  };

  useEffect(() => {
    if (movieId) {
      NowPlayingMovies();
    }
  }, [movieId]);

  return moviecrew;
};

export default useTvCrew;
