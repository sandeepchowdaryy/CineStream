import React from "react";
import { Movie_IMGBig } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
  // const trailervideo = useSelector((store) => store.movies?.trailervideo);
  
  // useMovieTrailer(movieId);

  return (
    <div className="">
      <img className="w-screen aspect-video" src={Movie_IMGBig+movieId} />
    </div>
  );
};

export default VideoBackground;
