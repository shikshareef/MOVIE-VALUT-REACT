import React, { useState, useEffect } from 'react';

function MovieCard({ movieObj, title, backgroundImage, handleAddtoWatchList, handleRemoveFromWatchList }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    // Check if movie is in the watchlist stored in local storage
    const watchlist = JSON.parse(localStorage.getItem('moviesApp')) || [];
    const isInLocalStorage = watchlist.some(movie => movie.id === movieObj.id);
    setIsInWatchlist(isInLocalStorage);
  }, [movieObj]);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchList(movieObj);
    } else {
      handleAddtoWatchList(movieObj);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div className='relative flex items-end h-[40vh] w-[200px] bg-center bg-cover m-5 transition-transform transform hover:scale-105 hover:shadow-lg' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div onClick={handleToggleWatchlist} className='absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-800 cursor-pointer'>
        {isInWatchlist ? '❌' : '⭐'}
      </div>
      <div className='absolute bottom-0 w-full bg-gray-800 bg-opacity-80 text-white text-2xl text-center py-3'>
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
