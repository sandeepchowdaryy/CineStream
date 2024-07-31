import React from 'react'
import useTvshows from '../hooks/useTvshows'
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Footer from './Footer';
import ShimmerPages from './ShimmerPages';

function TvShows() {
  const tvshows = useTvshows();
  return tvshows?.results?.length === 0 ? (<ShimmerPages/>):(
    <div className="bg-black text-white">
    <div className="flex ">
      <div className="flex flex-wrap justify-center items-center gap-7 w-screen pt-20">
        {tvshows?.results?.map((tv) => (
          <Link to={"/tv/" + tv?.id} onClick={""}>
            <MovieCard
              key={tv.div}
              posterPath={tv?.poster_path}
              title={tv?.title}
              releaseDate={tv?.release_date}
              vote_average={tv?.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
    <Footer/>
  </div>
  )
}

export default TvShows