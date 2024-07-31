import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { RxCross2 } from "react-icons/rx";

const VideoTitle = ({ title, overview, id }) => {
  const [showvideo, setshowvideo] = useState(null);
  const trailerData = useMovieTrailer(id);
  const filteredData = trailerData?.results?.filter(
    (video) => video.type === "Trailer"
  );
  const trailer = filteredData?.length
    ? filteredData[0]
    : filteredData?.results[0];
  console.log(trailer);
  const handleclick = () => {
    setshowvideo(!showvideo);
  };
  return  (
    <div className="absolute w-full   bg-gradient-to-r  from-black  px-16 py-[24%]  text-white">
      <h1 className="text-3xl font-bold py-4">{title}</h1>
      <p className=" w-[550px] overflow-hidden text-ellipsis text-gray-400 line-clamp-4">
        {overview}
      </p>
      <div className="pt-4 pb-6 flex gap-3">
        <button
          className="bg-white text-black text-xl py-1 px-5 rounded-md hover:opacity-80"
          onClick={handleclick}
        >
          {" "}
          ▶️ Play
        </button>
        <Link to={"/movie/" + id}>
          <button className="bg-gray-700 flex justify-center items-center gap-2 text-white text-lg py-1 px-5 rounded-md hover:opacity-80">
            <FiInfo className="text-xl" />
            <span>More Info</span>
          </button>
        </Link>
      </div>
      {showvideo && (
        <div className="fixed top-[15%] left-[20%] m-auto">
          <RxCross2
            onClick={() => {
              setshowvideo(!showvideo);
            }}
            className="absolute  text-3xl text-white left-[870px] cursor-pointer"
          />
          <iframe
            className="absolute "
            width="820"
            height="455"
            src={
              "https://www.youtube.com/embed/" +
              trailer?.key +
              "?si=4nOx2hdEtLq4l5jL"
            }
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoTitle;
