import React, { useState, useEffect, useMemo } from 'react';
import useTvshows from '../hooks/useTvshows';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Footer from './Footer';
import ShimmerPages from './ShimmerPages';
import { fetchGenres } from '../hooks/useTvGenres';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function TvShows() {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [fetchError, setFetchError] = useState(null);

  const { tvshowDetails, loading, error } = useTvshows(page);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setFetchError("Failed to load genres. Please try again later.");
      }
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

  const filteredTvshows = useMemo(() => {
    if (!tvshowDetails || !tvshowDetails.results) return [];
    return selectedGenre
      ? tvshowDetails.results.filter((tv) =>
          tv.genre_ids.includes(Number(selectedGenre))
        )
      : tvshowDetails.results;
  }, [tvshowDetails, selectedGenre]);

  const sortedTvshows = useMemo(() => {
    return filteredTvshows.sort((a, b) => {
      return sortOrder === "asc"
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    });
  }, [filteredTvshows, sortOrder]);

  if (loading) return <ShimmerPages />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col items-center gap-6 md:pt-20 pt-32">
        <div className="md:flex justify-between md:px-24 px-4 items-center mb-5 w-full">
          <h1 className="font-semibold md:text-2xl text-xl">Explore TV Shows</h1>
          <div className="flex gap-4 mt-5">
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
        <div className="flex flex-wrap justify-center items-center gap-7 w-screen">
          {sortedTvshows.length > 0 ? (
            sortedTvshows.map((tv) => (
              <Link to={`/tv/${tv?.id}`} key={tv?.id}>
                <MovieCard
                  posterPath={tv?.poster_path}
                  title={tv?.name}
                  releaseDate={tv?.first_air_date}
                  vote_average={tv?.vote_average}
                />
              </Link>
            ))
          ) : (
            <p>No TV shows available for the selected genre.</p>
          )}
        </div>
        <div className="flex justify-between w-full md:px-24 px-4 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-gray-700 text-white p-3 rounded-xl"
            aria-disabled={page === 1}
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

export default TvShows;
