import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

function Movies({ handleAddtoWatchList , handleRemoveFromWatchList }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6eab0dbaf7809504592bafb61c3536cc&language=en-US&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className='my-5'>
      <div className='text-center text-2xl font-bold mb-5'>
        Trending Movies
      </div>
      <div className='flex flex-wrap justify-center'>
        {movies.map((movie) => (
          <MovieCard
            movieObj={movie}
            key={movie.id}
            title={movie.title}
            handleAddtoWatchList={handleAddtoWatchList}
            handleRemoveFromWatchList ={handleRemoveFromWatchList}
            backgroundImage={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        ))}
      </div>
      <Pagination currentPage={page} onPageChange={handlePageChange} />
    </div>
  );
}

export default Movies;
