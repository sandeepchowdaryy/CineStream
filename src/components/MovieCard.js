import React from 'react'
import { Movie_IMG } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-[200px] '>
     <img src={Movie_IMG+posterPath} />

    </div>
  )
}

export default MovieCard