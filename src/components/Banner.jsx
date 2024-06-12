import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6eab0dbaf7809504592bafb61c3536cc&language=en-US&page=1`)
      .then((response) => {
        setBanners(response.data.results.slice(0, 4)); // Slice to get only the first four elements
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className='relative'>
      {banners.length > 0 && (
        <div className='h-full md:h-[75vh] bg-cover bg-center flex items-end'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${banners[currentBannerIndex].poster_path})`,
            backgroundSize: 'cover', // Ensure the image covers the entire container
            backgroundPosition: 'center', // Center the image
          }}>
          <div className='text-white text-2xl text-center w-full opacity-80 py-3 bg-gray-800'>{banners[currentBannerIndex].title}</div>
        </div>
      )}
    </div>
  );
}

export default Banner;
