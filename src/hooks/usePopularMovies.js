import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_Options } from "../utils/constants";


const usePopularMovies = () => {
const dispatch = useDispatch();
const isrendered = useSelector((store) => store.movies.popularmovies);
  const NowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_Options);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }
  useEffect(()=>{
   !isrendered && NowPlayingMovies();
  },[])
}

export default usePopularMovies;