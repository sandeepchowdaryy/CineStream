import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="px-24 py-36">
      <h1 className="text-5xl py-5">{title}</h1>
      <p className="py-4 w-1/2">{overview}</p>
      <div className="flex gap-3">
        <button className="bg-gray-500 text-xl py-2 px-6 rounded-md">
          {" "}
          ▶️ Play
        </button>
        <button className="bg-black text-white text-lg py-2 px-6 rounded-md">
         More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
