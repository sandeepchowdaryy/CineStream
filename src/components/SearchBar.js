import React, { useRef } from "react";
//import openai from "./openai";
import { API_Options } from "../utils/constants";
import { addSearchMovieResult, addsearchtext } from "../utils/searchSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const searchtext = useRef(null);
  const dispatch = useDispatch();
 
  
  const searchmovietdb = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchtext.current.value +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addsearchtext(searchtext.current.value));
    dispatch(addSearchMovieResult(json.results));
  };

  return (
    <div className="pt-[10%] bg-black flex justify-center">
      <form
        className="w-1/2  grid grid-cols-12 mb-10 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          className="col-span-9 p-3 m-3 rounded-lg"
          type="text"
          placeholder="Search for Movie's and TV Shows"
        />
        <button
          className="col-span-3 rounded-lg  bg-red-700 text-white py-2 px-4 m-3"
          type="submit"
          onClick={searchmovietdb}
        >
          {" "}
          Search{" "}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
