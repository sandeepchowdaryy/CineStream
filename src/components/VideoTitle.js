import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { RxCross2 } from "react-icons/rx";

const VideoTitle = ({ title, overview, id }) => {
  const [showVideo, setShowVideo] = useState(null);
  const trailerData = useMovieTrailer(id);
  const filteredData = trailerData?.results?.filter(
    (video) => video.type === "Trailer"
  );
  const trailer = filteredData?.length
    ? filteredData[0]
    : trailerData?.results[0];

  const handleClick = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="absolute w-full bg-gradient-to-r from-black md:px-16 md:py-[25%] px-4 py-[45%] text-white">
      <h1 className="text-3xl font-bold md:py-4 line-clamp-1">{title}</h1>
      <p
        className="md:w-[700px] md:block hidden  overflow-hidden text-ellipsis md:text-gray-400 text-gray-300 max-h-[90px]"
      >
        {overview}
      </p>
      <div className="pt-4 pb-6 flex gap-3">
        <button
          className="bg-white text-black text-xl py-1 px-5 rounded-md hover:opacity-80"
          onClick={handleClick}
          aria-label="Play Trailer"
        >
          ▶️ Play
        </button>
        <Link to={"/movie/" + id}>
          <button className="bg-gray-700 flex justify-center items-center gap-2 text-white text-lg py-1 px-5 rounded-md hover:opacity-80">
            <FiInfo className="text-xl" />
            <span>More Info</span>
          </button>
        </Link>
      </div>
      {showVideo && (
        <div className="fixed md:top-[15%] md:left-[20%] top-[12%] left-[10%]  m-auto">
          <RxCross2
            onClick={handleClick}
            className="text-3xl text-white md:left-[900px] cursor-pointer"
            aria-label="Close Trailer"
          />
          <iframe
            className="absolute md:w-[800px] md:h-[450px] w-[400px] h-[250px] z-50"
            src={`https://www.youtube.com/embed/${trailer?.key}?si=4nOx2hdEtLq4l5jL`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoTitle;
