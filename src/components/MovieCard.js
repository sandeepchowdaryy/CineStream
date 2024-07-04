import React from "react";
import { Movie_IMG } from "../utils/constants";

const MovieCard = ({ posterPath, title, releaseDate,vote_average }) => {
  return (
    <div className="relative flex flex-col w-[220px]">
      <div>
        {!posterPath ? (
          <img
            className="rounded-lg h-[20rem] "
            src="https://th.bing.com/th/id/OIP.T1uutxkFTHvSswa1emt5HAAAAA?w=124&h=186&c=7&r=0&o=5&dpr=2&pid=1.7"
          />
        ) : (
          <img className="rounded-lg" src={Movie_IMG + posterPath} />
        )}
      </div>
      <div className="absolute  mt-72  text-black font-bold">
        <span className="mt-6 ml-6 absolute flex justify-center">{vote_average.toFixed(1)}</span>
        <img className="object-fill rounded-full h-[70px] w-[70px]" src="https://th.bing.com/th/id/OIP.0hKzrylFaxJ_uGxRTsCiQAHaHa?rs=1&pid=ImgDetMain"/>
      </div>
      <div className="pt-9 flex flex-col gap-1">
        <h3 className="text-2xl overflow-hidden text-ellipsis line-clamp-1">
          {title}
        </h3>
        <h3 className="text-[12px] text-gray-500">{releaseDate}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
