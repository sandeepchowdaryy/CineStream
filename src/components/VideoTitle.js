import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen h-screen aspect-video bg-gradient-to-r  from-black  px-16 py-[17%]  text-white">
      <h1 className="text-4xl font-bold py-4">{title}</h1>
      <p className="py-4 w-1/3">{overview}</p>
      <div className="flex gap-3">
        <button className="bg-white text-black text-xl py-2 px-6 rounded-md hover:opacity-80">
          {" "}
          ▶️ Play
        </button>
        <button className="bg-gray-700 text-white text-lg py-2 px-6 rounded-md hover:opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
