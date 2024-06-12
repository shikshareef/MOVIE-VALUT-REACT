import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import genres from '../utils/data';

function WatchList({ watchlist, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState(null);
  const [genreList, setGenreList] = useState(['All Genres']);
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (direction) => {
    setSortDirection(direction);
  };

  const handleGenreFilter = (selectedGenre) => {
    setSelectedGenre(selectedGenre);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      if (movieObj.genre_ids && movieObj.genre_ids.length > 0) {
        return genres[movieObj.genre_ids[0]];
      }
      return null;
    }).filter((genre, index, self) => self.indexOf(genre) === index); // Filter out duplicates

    setGenreList(['All Genres', ...temp]);
  }, [watchlist]);

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.vote_average - b.vote_average;
    } else if (sortDirection === 'desc') {
      return b.vote_average - a.vote_average;
    }
    return 0; // No sorting if sortDirection is null
  });
  let filteredWatchlist = sortedWatchlist;

  if (selectedGenre && selectedGenre !== 'All Genres') {
    filteredWatchlist = sortedWatchlist.filter((movieObj) =>
      movieObj.genre_ids.some(genreId => genres[genreId] === selectedGenre)
    );
  }
  
  filteredWatchlist = filteredWatchlist.filter((movieObj) =>
    movieObj.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='flex justify-center flex-wrap m-4 gap-5'>
        {genreList.map((genreItem, index) => (
          <div key={index} className={`rounded-lg flex justify-center h-[2.4rem] w-[9rem] items-center font-bold cursor-pointer ${selectedGenre === genreItem ? 'bg-blue-400' : 'bg-gray-300'}`} onClick={() => handleGenreFilter(genreItem)}>{genreItem}</div>
        ))}
      </div>

      <div className='flex justify-center my-4'>
        <input
          value={search}
          onChange={handleSearch}
          placeholder='Search Movies'
          className='h-[3rem] w-[18rem] bg-gray-200 outline-none rounded-md p-2'
          type="text"
        />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Title</th>
              <th className='flex justify-center items-center'>
                <div className='p-2 cursor-pointer' onClick={() => handleSort('desc')}><FaArrowUp /></div>
                <div className='p-2'>Rating</div>
                <div className='p-2 cursor-pointer' onClick={() => handleSort('asc')}><FaArrowDown /></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist.map((movie, index) => (
              <tr key={index} className='border-b-2'>
                <td className='flex items-center py-4'>
                  <img className='h-[6rem] w-[10rem]' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <div className='mx-10'>{movie.title}</div>
                </td>
                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>
                <td>{selectedGenre !== 'All Genres' ? selectedGenre : genres[movie.genre_ids[0]]}</td>
                <td className='text-red-400 font-bold cursor-pointer' onClick={() => handleRemoveFromWatchList(movie)}>
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
