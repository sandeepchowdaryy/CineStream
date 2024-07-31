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
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Shimmer from "./Shimmer";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const movies = useSelector((store) => store.movies);
  const [showtrailer, setshowtrailer] = useState(false);
  const [videoId, setvideoId] = useState(null);
  const [showvideo, setshowvideo] = useState(false);
  const showsearch = useSelector((store) => store.search.showsearch);
  const movieDetails = useMovieDetails(movieId);
  const video = useMovieTrailer(movieId);
  const moviecrew = useMovieCrew(movieId);
  useSimilarMovies(movieId);
  const filteredData = video?.results?.filter(
    (video) => video.type === "Trailer"
  );
  console.log(filteredData);
  const trailer = filteredData?.length ? filteredData[0] : video?.results[0];
  useEffect(() => {
    console.log(`Movie ID has changed to: ${movieId}`);
  }, [movieId]);

  const handleClick = () => {
    setshowtrailer(!showtrailer);
  };

  return movieDetails === null ? (
    <Shimmer/>
    
  ) : (
    <div>
      {showsearch ? (
        <Search />
      ) : (
        <div className="w-full h-full">
          <div className="">
            <div className="bgposter absolute top-0 left-0 z-0">
              <img
                className="w-full object-cover h-full"
                src={Movie_IMGBig + movieDetails?.backdrop_path}
              />
            </div>
            <div className="gap-10 w-full moviedetails absolute bg-opacity-85 bg-black flex px-36 py-24">
              <div className="left">
                <img
                  className="w-[370px] rounded-lg"
                  src={
                    "https://image.tmdb.org/t/p/original" +
                    movieDetails?.poster_path
                  }
                />
              </div>
              <div className="right flex flex-col gap-5  text-white">
                <div className="flex flex-col gap-2 title of movie">
                  <span className="text-4xl line-clamp-1">{movieDetails?.title}</span>
                  <span className="test-xl text-gray-400">
                    {movieDetails?.tagline}
                  </span>
                </div>
                <div className="genre text-[12px] flex gap-3">
                  {/* {movieDetails?.genres?.map((genre) => genre?.name)?.join(" , ")} */}
                  {movieDetails?.genres?.map((id) => {
                    if (!id.id) return;
                    return (
                      <div
                        className="genre bg-pink-900 p-1 rounded-lg whitespace-nowrap text-white "
                        key={id}
                      >
                        {id.name}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-5 justify-start items-center">
                  <div className="flex gap-2 justify-center items-center">
                    {/* <img className="w-[80px] rounded-full" src="https://th.bing.com/th/id/OIP.0hKzrylFaxJ_uGxRTsCiQAHaHa?rs=1&pid=ImgDetMain" /> */}
                    {/* <TiStarFullOutline className="text-4xl text-red-500" /> */}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/477/477406.png"
                      className="w-[50px]"
                    />
                    <span className=" text-3xl font-bold text-gray-100">
                      {movieDetails?.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={handleClick}
                      className=" flex justify-center items-center gap-2 bg-transparent rounded-lg  px-5 py-4 "
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
                          className="absolute top-[160px] text-3xl left-[1070px]"
                        />
                        <iframe
                          className="absolute top-[200px] left-[280px]"
                          width="820"
                          height="455"
                          src={
                            "https://www.youtube.com/embed/" +
                            trailer?.key +
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
                </div>
                <div>
                  <span className="text-2xl pb-10">Overview</span>
                  <p className="max-w-[650px] text-gray-400 line-clamp-5 ">
                    {movieDetails?.overview}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="font-semibold">
                    Status:{" "}
                    <span className="text-gray-500">
                      {" "}
                      {movieDetails?.status}
                    </span>{" "}
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
                    <span className="pl-2 text-gray-500 line-clamp-1 ">
                      {moviecrew?.crew
                        ?.filter((res) => res.department === "Production")
                        .map((director, idx) => (
                          <div key={idx}>
                            {director.name}
                            {idx < director.length - 1 && ","}
                          </div>
                        ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="movieCast absolute top-[43rem]">
            <div>
              <div className="">
                <h1 className="text-white text-2xl font-semibold pl-20 ">
                  Top Cast
                </h1>
                <div className="w-[1415px] flex  gap-[20px] px-16 py-2  bg-black overflow-hidden overflow-x-scroll no-scrollbar">
                  {moviecrew?.cast?.map((actor) => {
                    if (actor?.profile_path === null) return;
                    return (
                      <div
                        className="relative flex flex-col pb-10 gap-1 justify-center items-center min-w-[200px] p-2"
                        key={actor.id}
                      >
                        <img
                          className="w-[175px] h-[175px] rounded-full  object-cover"
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
              <div className="  bg-black">
                <h1 className="text-white text-2xl font-semibold pl-20">
                  Official Video's
                </h1>
                <div className=" w-[1415px] px-20 py-8 flex gap-5 overflow-hidden overflow-x-scroll no-scrollbar">
                  {video?.results?.map((video) => {
                    return (
                      <div
                        key={video?.id}
                        className="relative flex flex-col gap-3"
                        onClick={() => {
                          setshowvideo(!showvideo);
                          setvideoId(video.key);
                        }}
                      >
                        <div className="videoThumbnail relative  w-[300px] ">
                          <img
                            className="w-full rounded-xl opacity-50 hover:opacity-20"
                            src={
                              "https://img.youtube.com/vi/" +
                              video?.key +
                              "/mqdefault.jpg"
                            }
                          />
                          <div className=" absolute top-[40%] left-[45%] w-[60px] h-[60px] m-auto">
                            <img
                              className="hover:text-white"
                              src="https://www.svgrepo.com/show/475861/play-button.svg"
                            />
                          </div>
                        </div>
                        <div className="videoTitle text-gray-300 w-[300px] font-normal">
                          {video?.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-[1415px] bg-black  pl-14 text-white absolute">
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
              <footer className="footer  bottom-0  text-white flex flex-col gap-8 py-10 justify-center items-center bg-black">
                <ul className="menuItems flex gap-7">
                  <li className="menuItem">Terms Of Use</li>
                  <li className="menuItem">Privacy-Policy</li>
                  <li className="menuItem">About</li>
                  <li className="menuItem">Blog</li>
                  <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText max-w-[900px] text-gray-500 text-sm text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons flex gap-5 text-xl">
                  <span className="icon">
                    <FaFacebookF />
                  </span>
                  <span className="icon">
                    <FaInstagram />
                  </span>
                  <span className="icon">
                    <FaTwitter />
                  </span>
                  <span className="icon">
                    <FaLinkedin />
                  </span>
                </div>
              </footer>
            </div>
          </div>

          {showvideo && (
            <div className="fixed top-[25%] left-[20%] m-auto">
              <RxCross2
                onClick={() => {
                  setshowvideo(!showvideo);
                }}
                className="absolute  text-3xl text-white left-[870px] cursor-pointer"
              />
              <iframe
                className="absolute "
                width="820"
                height="455"
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
