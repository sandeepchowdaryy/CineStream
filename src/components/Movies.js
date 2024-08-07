import React, { useState, useEffect } from "react";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Footer from "./Footer";
import ShimmerPages from "./ShimmerPages";
import { fetchGenres } from "../hooks/useGenres"; 
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";


function Movies() {
  const [page, setPage] = useState(1);
  const movies = useMovies(page);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const getGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList.genres);
    };
    getGenres();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const filteredMovies = selectedGenre
    ? movies?.results?.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      )
    : movies?.results;

  const sortedMovies = filteredMovies?.sort((a, b) => {
    return sortOrder === "asc"
      ? a.vote_average - b.vote_average
      : b.vote_average - a.vote_average;
  });

  return movies === null ? (
    <ShimmerPages />
  ) : (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center gap-6 md:pt-20 pt-36">
        <div className="md:flex  justify-start pl-5 md:pl-24 items-center md:gap-[45rem] w-full mb-5">
          <div>
            <h1 className="font-semibold text-2xl">Explore Movies</h1>
          </div>
          <div className="flex gap-4  pt-5">
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="bg-gray-700 text-white font-sans p-1 rounded-xl"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="bg-gray-700 text-white p-2 font-sans rounded-xl"
            >
              <option value="asc">Rating Ascending</option>
              <option value="desc">Rating Descending</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-7 ">
          {sortedMovies?.map((movie) => (
            <Link to={"/movie/" + movie?.id} key={movie.id}>
              <MovieCard
                posterPath={movie?.poster_path}
                title={movie?.title}
                releaseDate={movie?.release_date}
                vote_average={movie?.vote_average}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-between w-full md:px-24 px-3 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-gray-700 text-white p-3 rounded-xl mr-4"
          >
            <div className="flex justify-center items-center gap-4">
              <FaArrowLeft className="text-xl" />
              <p className="font-semibold">Previous</p>  
            </div>
           
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-700 text-white p-3 rounded-xl"
          >
             <div className="flex justify-center items-center gap-4">
             <p className="font-semibold">Next</p> 
              <FaArrowRight className="text-xl" />
               
            </div>
             
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
