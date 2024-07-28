import { API_Options } from "../utils/constants";
import { useEffect, useState } from "react";

const useTvTrailer = (movieId) => {
//  const dispatch = useDispatch();
  const [movietrailer,setmovietrailer] = useState(null);
  //fetching trailer and updating to redux store.
  const getMoviesVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/"+ movieId +"/videos?language=en-US",
      API_Options
    );
    const json = await data.json();
    // const filteredData = json?.results?.filter(
    //   (video) => video.type === "Trailer"
    // );
    // const trailer = filteredData?.length? filteredData[0] : json.results[0];
    // console.log(trailer);
    // dispatch(addTrailerVideo(trailer));
    setmovietrailer(json);
  };

  useEffect(() => {
    if (movieId) {
      getMoviesVideos();
    }
  }, [movieId]);

  return movietrailer;
};

export default useTvTrailer;
