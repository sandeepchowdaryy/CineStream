import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie_IMGBig } from "../utils/constants";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { Search } from "./Search";
import MovieList from "./MovieList";
import useTvDetails from "../hooks/useTvDetails";
import useTvTrailer from "../hooks/useTvTrailer";
import useTvCrew from "../hooks/useTvCrew";
import useSimilarTvShows from "../hooks/useSimilarTvShows";
import Shimmer from "./Shimmer";
import Footer from "./Footer";

const TvShowDetails = () => {
    const { tvId } = useParams();
    const movies = useSelector((store) => store.movies);
    const [showtrailer, setshowtrailer] = useState(false);
    const [videoId, setvideoId] = useState(null);
    const [showvideo, setshowvideo] = useState(false);
    const showsearch = useSelector((store) => store.search.showsearch);
    const movieDetails = useTvDetails(tvId);
    const video = useTvTrailer(tvId);
    const moviecrew = useTvCrew(tvId);
    useSimilarTvShows(tvId);

    const filteredData = video?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData?.length ? filteredData[0] : video?.results[0];
  
    useEffect(() => {
      console.log(`TV Show ID has changed to: ${tvId}`);
    }, [tvId]);
  
    const handleClick = () => {
      setshowtrailer(!showtrailer);
    };
  
    return movieDetails === null ? (
      <Shimmer />
    ) : (
      <div className="w-full h-full bg-black text-white">
        {showsearch ? (
          <Search />
        ) : (
          <div>
            <div className="relative">
              <div className="absolute md:block hidden top-0 left-0 w-full h-[300px] md:h-[500px] z-0">
                <img
                  className="w-full h-full object-cover"
                  src={Movie_IMGBig + movieDetails?.backdrop_path}
                  alt={movieDetails?.name}
                />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 px-4 md:px-8 lg:px-16 py-6 md:py-12 bg-black bg-opacity-75">
                <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                  <img
                    className="w-full rounded-lg"
                    src={"https://image.tmdb.org/t/p/original" + movieDetails?.poster_path}
                    alt={movieDetails?.name}
                  />
                </div>
                <div className="flex-grow text-white">
                  <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{movieDetails?.name}</h1>
                    <p className="text-lg md:text-xl text-gray-400">{movieDetails?.tagline}</p>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2 text-xs md:text-sm">
                    {movieDetails?.genres?.map((genre) => (
                      <span
                        className="bg-pink-900 p-1 rounded-lg text-white"
                        key={genre.id}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-8">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/477/477406.png"
                      className="w-[50px] mr-2"
                      alt="Rating"
                    />
                    <span className="text-2xl font-bold">{movieDetails?.vote_average?.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={handleClick}
                    className="flex items-center gap-2 bg-transparent rounded-lg px-4 py-2 "
                  >
                    <img
                      className="w-16 h-16"
                      src="https://www.svgrepo.com/show/475861/play-button.svg"
                      alt="Play"
                    />
                    <span className="text-xl hover:text-red-500">Trailer</span>
                  </button> </div>
                  {showtrailer && trailer && (
                    <div className="relative mt-4">
                      <RxCross2
                        onClick={handleClick}
                        className="absolute top-0 right-0 text-3xl cursor-pointer"
                      />
                      <iframe
                        className="w-full h-[315px] md:h-[500px] mt-4"
                        src={"https://www.youtube.com/embed/" + trailer.key}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <div className="mt-4">
                    <h2 className="text-xl mb-2">Overview</h2>
                    <p className="text-gray-400 line-clamp-5">{movieDetails?.overview}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <p>Status: <span className="text-gray-500">{movieDetails?.status}</span></p>
                    <p>Producer: <span className="text-gray-500">
                      {moviecrew?.crew
                        ?.filter((member) => member.department === "Production")
                        .map((producer, idx) => (
                          <span key={producer.id}>
                            {producer.name}
                            {idx < moviecrew.crew.length - 1 && ", "}
                          </span>
                        ))}
                    </span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 md:py-12">
              <h2 className="text-2xl font-semibold pl-4 md:pl-8 lg:pl-16">Top Cast</h2>
              <div className="flex overflow-x-auto gap-4 px-4 md:px-8 lg:px-16">
                {moviecrew?.cast?.map((actor) => (
                  <div className="flex-shrink-0 w-[150px] md:w-[200px]" key={actor.id}>
                    {actor.profile_path && (
                      <div className="flex flex-col items-center">
                        <img
                          className="w-full h-[175px] rounded-full object-cover"
                          src={"https://image.tmdb.org/t/p/original" + actor.profile_path}
                          alt={actor.name}
                        />
                        <div className="text-center mt-2">
                          <p className="text-white font-semibold">{actor.name}</p>
                          <p className="text-gray-500 text-sm">{actor.character}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="py-6 md:py-12">
              <h2 className="text-2xl font-semibold pl-4 md:pl-8 lg:pl-16">Official Videos</h2>
              <div className="flex overflow-x-auto gap-4 px-4 md:px-8 lg:px-16">
                {video?.results?.map((video) => (
                  <div
                    className="flex-shrink-0 w-[250px] md:w-[300px]"
                    key={video.id}
                    onClick={() => {
                      setshowvideo(true);
                      setvideoId(video.key);
                    }}
                  >
                    <div className="relative">
                      <img
                        className="w-full rounded-xl opacity-50 hover:opacity-80"
                        src={"https://img.youtube.com/vi/" + video.key + "/mqdefault.jpg"}
                        alt={video.name}
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] flex items-center justify-center">
                        <img
                          className="w-12 h-12"
                          src="https://www.svgrepo.com/show/475861/play-button.svg"
                          alt="Play"
                        />
                      </div>
                    </div>
                    <p className="text-gray-300 mt-2">{video.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-6 md:py-12">
              <div className="md:px-8 lg:px-16">
                <MovieList
                  name={"Similar Shows"}
                  movies={movies?.similarmovies}
                  type={"tv"}
                />
                <MovieList
                  name={"Trending Movies"}
                  movies={movies?.trendingmovies}
                />
                <Footer />
              </div>
            </div>
            {showvideo && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                <div className="relative">
                  <RxCross2
                    onClick={() => setshowvideo(false)}
                    className="absolute top-0 right-0 text-3xl cursor-pointer text-white"
                  />
                  <iframe
                    className="w-full h-[315px] md:h-[500px]"
                    src={"https://www.youtube.com/embed/" + videoId}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default TvShowDetails;
