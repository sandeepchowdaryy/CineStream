import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";

const useMovies = (page = 1) => {
  const [moviedetails, setmoviedetails] = useState(null);

  const fetchMovies = async (page) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`,
        API_Options
      );
      const json = await data.json();
      setmoviedetails(json);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setmoviedetails([]);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return moviedetails;
};

export default useMovies;
