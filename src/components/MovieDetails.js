import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import { Movie_IMGBig } from "../utils/constants";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { RxCross2 } from "react-icons/rx";
import useMovieCrew from "../hooks/useMovieCrew";
import { Search } from "./Search";
import useSimilarMovies from "../hooks/useSimilarMovies";
import MovieList from "./MovieList";
import Footer from "./Footer";
import Shimmer from "./Shimmer";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const movies = useSelector((store) => store.movies);
  const [showtrailer, setshowtrailer] = useState(false);
  const [videoId, setvideoId] = useState(null);
  const [showvideo, setshowvideo] = useState(false);
  const showsearch = useSelector((store) => store.search.showsearch);
  const [movieDetails, setMovieDetails] = useState(null);
  const movieData = useMovieDetails(movieId);
  const video = useMovieTrailer(movieId);
  const moviecrew = useMovieCrew(movieId);
  useSimilarMovies(movieId);

  const filteredData = video?.results?.filter(
    (video) => video.type === "Trailer"
  );
  const trailer = filteredData?.length ? filteredData[0] : video?.results[0];

  useEffect(() => {
    setMovieDetails(null); // Reset movie details to null to show shimmer
    window.scrollTo(0, 0);
    setMovieDetails(movieData);
  }, [movieId, movieData]);

  const handleClick = () => {
    setshowtrailer(!showtrailer);
  };

  return movieDetails === null ? (
    <Shimmer />
  ) : (
    <div>
      {showsearch ? (
        <Search />
      ) : (
        <div className="w-full h-full bg-black">
          <div className="relative">
            <div className="bgposter md:block hidden absolute top-0 left-0 z-0">
              <img
                loading="eager"
                className="w-full object-cover h-full"
                src={Movie_IMGBig + movieDetails?.backdrop_path}
              />
            </div>
            <div className="gap-10 w-full moviedetails absolute bg-opacity-90 bg-black flex flex-col md:flex-row px-8 md:px-36 py-24">
              <div className="left">
                <img
                  className="w-full md:w-[370px] rounded-lg"
                  src={
                    "https://image.tmdb.org/t/p/original" +
                    movieDetails?.poster_path
                  }
                />
              </div>
              <div className="right flex flex-col gap-5 text-white">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl md:text-4xl line-clamp-1">
                    {movieDetails?.title}
                  </span>
                  <span className="text-xl text-gray-400">
                    {movieDetails?.tagline}
                  </span>
                </div>
                <div className="genre text-[12px] flex gap-3 flex-wrap">
                  {movieDetails?.genres?.map((id) => {
                    if (!id.id) return;
                    return (
                      <div
                        className="genre bg-pink-900 p-1 rounded-lg whitespace-nowrap text-white"
                        key={id.id}
                      >
                        {id.name}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-5 justify-start items-center flex-wrap">
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/477/477406.png"
                      className="w-[50px]"
                    />
                    <span className="text-3xl font-bold text-gray-100">
                      {movieDetails?.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={handleClick}
                      className="flex justify-center items-center gap-2 bg-transparent rounded-lg px-5 py-4"
                    >
                      <img
                        className="w-[80px] h-[70px] hover:h-[80px]"
                        src="https://www.svgrepo.com/show/475861/play-button.svg"
                      />
                      <h1 className="text-2xl text-gray-400 font-sans hover:text-white">
                        Trailer
                      </h1>
                    </button>
                    {showtrailer && (
                      <div>
                        <RxCross2
                          onClick={handleClick}
                          className="absolute md:top-[160px] top-[47%] text-3xl md:left-[80%] left-[92%]"
                        />
                        <iframe
                          className="absolute md:top-[200px] top-[50%] left-[5%] w-[90%] h-[320px] md:left-[20%] md:w-[820px] md:h-[455px]"
                          src={
                            "https://www.youtube.com/embed/" +
                            trailer?.key +
                            "?si=4nOx2hdEtLq4l5jL"
                          }
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-2xl pb-10">Overview</span>
                  <p className="max-w-[650px] text-gray-400 line-clamp-5">
                    {movieDetails?.overview}
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <p className="font-semibold">
                    Status:{" "}
                    <span className="text-gray-500">
                      {" "}
                      {movieDetails?.status}
                    </span>
                  </p>
                  <p>
                    Release:{" "}
                    <span className="text-gray-500">
                      {" "}
                      {movieDetails?.release_date}
                    </span>
                  </p>
                  <p>
                    Runtime:{" "}
                    <span className="text-gray-500">
                      {movieDetails?.runtime}m
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="flex">
                    Director:{" "}
                    <span className="pl-2 text-gray-500 line-clamp-1">
                      {moviecrew?.crew
                        ?.filter((res) => res.department === "Directing")
                        .map((director) => (
                          <div key={director.id}>{director.name}</div>
                        ))}
                    </span>
                  </p>
                  <p className="flex">
                    Producer:{" "}
                    <span className="pl-2 text-gray-500 line-clamp-1">
                      {moviecrew?.crew
                        ?.filter((res) => res.department === "Production")
                        .map((producer, idx) => (
                          <div key={producer.id}>
                            {producer.name}
                            {idx < moviecrew.crew.length - 1 && ","}
                          </div>
                        ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="movieCast relative md:top-[42rem] top-[85rem]">
            <div>
              <div className="">
                <h1 className="text-white text-2xl font-semibold pl-8 md:pl-20">
                  Top Cast
                </h1>
                <div className="w-full md:w-[1415px] flex gap-[20px] px-8 md:px-16 py-2 bg-black overflow-hidden overflow-x-scroll no-scrollbar">
                  {moviecrew?.cast?.map((actor) => {
                    if (actor?.profile_path === null) return;
                    return (
                      <div
                        className="relative flex flex-col pb-10 gap-1 justify-center items-center min-w-[150px] md:min-w-[200px] p-2"
                        key={actor.id}
                      >
                        <img
                          className="w-[150px] md:w-[175px] h-[150px] md:h-[175px] rounded-full object-cover"
                          src={
                            "https://image.tmdb.org/t/p/original" +
                            actor?.profile_path
                          }
                        />
                        <div className="text-white text-lg font-semibold line-clamp-1">
                          {actor?.name}
                        </div>
                        <div className="text-gray-500 line-clamp-2 text-sm">
                          {actor?.character}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="movieTrailer">
              <div className="bg-black md:pl-[3.0rem]">
                <h1 className="text-white text-2xl font-semibold pl-8">
                  Official Videos
                </h1>
                <div className=" md:w-[1360px]  px-8 py-8 flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
                  {video?.results?.map((video) => {
                    return (
                      <div
                        className="flex flex-col gap-2 cursor-pointer"
                        key={video.id}
                        onClick={() => {
                          setshowvideo(!showvideo);
                          setvideoId(video.key);
                        }}
                      >
                        <div className="videoThumbnail relative  md:w-[300px] w-[250px]">
                          <img
                            className="w-full rounded-xl opacity-50 hover:opacity-20"
                            src={
                              "https://img.youtube.com/vi/" +
                              video?.key +
                              "/mqdefault.jpg"
                            }
                          />
                          <div className="absolute top-[40%] left-[45%] w-[60px] h-[60px] m-auto">
                            <img
                              className="hover:text-white"
                              src="https://www.svgrepo.com/show/475861/play-button.svg"
                            />
                          </div>
                        </div>
                        <div className="videoTitle text-gray-300 w-full md:w-[300px] font-normal">
                          {video?.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[1415px] bg-black pl-7  md:pl-20 text-white relative">
              <MovieList
                name={"Similar Movies"}
                movies={movies?.similarmovies}
                type={"movie"}
              />
              <MovieList
                name={"Trending movies"}
                movies={movies?.trendingmovies}
                type={"movie"}
              />
              <Footer />
            </div>
          </div>
          </div>
          
          {showvideo && (
              <div className="fixed top-[25%] md:left-[20%] m-auto ">
                <RxCross2
                  onClick={() => {
                    setshowvideo(!showvideo);
                  }}
                  className="text-white  text-3xl "
                />
                <iframe
                  className="absolute md:w-[850px] md:h-[500px] w-screen h-[350px]"
                 
                  src={
                    "https://www.youtube.com/embed/" +
                    videoId +
                    "?si=4nOx2hdEtLq4l5jL"
                  }
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
