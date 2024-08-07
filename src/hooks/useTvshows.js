import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";

const useTvshows = (page = 1) => {
  const [tvshowDetails, setTvshowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTvshows = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        API_Options
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setTvshowDetails(json);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      setError("Failed to fetch TV shows. Please try again later.");
      setTvshowDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTvshows(page);
  }, [page]);

  return { tvshowDetails, loading, error };
};

export default useTvshows;
