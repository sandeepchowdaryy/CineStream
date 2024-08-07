import { API_Options } from "../utils/constants";
import { useEffect, useState } from "react";

const useMovieTrailer = (movieId) => {
//  const dispatch = useDispatch();
  const [movietrailer,setmovietrailer] = useState(null);
  //fetching trailer and updating to redux store.
  const getMoviesVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
      API_Options
    );
    const json = await data.json();
    setmovietrailer(json);
  };

  useEffect(() => {
    if (movieId) {
      getMoviesVideos();
    }
  }, [movieId]);

  return movietrailer;
};

export default useMovieTrailer;
