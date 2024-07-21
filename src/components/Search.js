import React from "react";
import SearchBar from "./SearchBar";
import SearchMovieSuggestions from "./SearchMovieSuggestions";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";

export const Search = () => {
  // const {showsearch} = useSelector((store) => store.search);
  const dispatch = useDispatch();

  return (
    <div> 
      

      <SearchBar />
      <SearchMovieSuggestions />
    </div>
  );
};
