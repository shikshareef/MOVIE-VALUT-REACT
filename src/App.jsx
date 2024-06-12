import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';

function App() {
  const [watchlist, setWatchList] = useState([]);

  const handleAddtoWatchList = (movieObj) => {
    const newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp', JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchlist.filter((movie) => movie.id !== movieObj.id);
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('moviesApp');
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<><Banner /> <Movies handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} /></>} />
        <Route path='/watchlist' element={<WatchList watchlist={watchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
