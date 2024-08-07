import React from "react";
import { Movie_IMG } from "../utils/constants";

const MovieCard = ({ posterPath, title, releaseDate,vote_average }) => {
  return (
    <div className="relative flex flex-col md:w-[220px] w-[110px]">
      <div>
        {!posterPath ? (
          <img
            className="rounded-lg h-[10.5rem] "
            src="https://th.bing.com/th/id/OIP.T1uutxkFTHvSswa1emt5HAAAAA?w=124&h=186&c=7&r=0&o=5&dpr=2&pid=1.7"
          />
        ) : (
          <img className="rounded-lg md:h-[330px] h-[170px]" src={Movie_IMG + posterPath} />
        )}
      </div>
      <div className="absolute  md:mt-72 mt-36 text-black font-bold">
        <span className="md:mt-5 md:ml-5 mt-4 ml-4 absolute text-sm flex justify-center">{vote_average?.toFixed(1)}</span>
        <img className="object-fill rounded-full md:h-[60px] md:w-[60px] h-[50px] w-[50px]" src="https://th.bing.com/th/id/OIP.0hKzrylFaxJ_uGxRTsCiQAHaHa?rs=1&pid=ImgDetMain"/>
      </div>
      <div className="pt-9 flex flex-col gap-1">
        <h3 className="md:text-[21px] text-[14px] overflow-hidden text-ellipsis line-clamp-1">
          {title}
        </h3>
        <h3 className="md:text-[12px] text-[11px] text-gray-500">{releaseDate}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
