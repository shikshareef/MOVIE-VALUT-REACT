import React from 'react'
import Logo from '../assets/movieicon.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-1'>
        <img  className = 'w-[50px]' src={Logo} alt='' />
        <Link className='text-blue-400 text-xl font-bold' to='/'>Home</Link>
        <Link className='text-blue-400  text-xl font-bold' to="/watchlist">WatchList</Link>
    </div>
  )
}

export default Navbar