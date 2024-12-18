import React from 'react'
import Wishlist from '../common/Wishlist'
import AccountIcon from '../common/AccountIcon'
import CartIcon from '../common/CartIcon'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {
  return (
   
    <nav className='flex items-center py-6 px-16 justify-between gap-40'>
        <div className='flex items-center gap-6'>
            {/* {logo} */}
            <a href='/' className='text-3xl text-black gap-8 font-mono'>Urban Aisle</a>
        </div>
        <div className='flex flex-wrap items-center gap-10 flex-1'>
            {/* {Navigation Items} */}
          <ul className='flex gap-14 text-black hover:text-gray-500' >
            <li ><NavLink to='/' className={({isActive})=> isActive ? 'active-link' : ''}>Shop</NavLink></li>
            <li ><NavLink to='/men' className={({isActive})=> isActive ? 'active-link' : ''}>Men</NavLink></li>
            <li ><NavLink to='/women' className={({isActive})=> isActive ? 'active-link' : ''}>Women</NavLink></li>
            <li ><NavLink to='/kid' className={({isActive})=> isActive ? 'active-link' : ''}>Kids</NavLink></li>
          </ul>
        </div>
        <div className='flex-justify-center'>
          {/* search Bar */}
          <div className='border rounded flex overflow-hidden'>
            <div className='flex items-center justify-center px-4 border-1'>
              <input type='text' className='px-4 py-2 outline-none' placeholder="Search"/>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-4'>
          {/* action Items */}
          <ul className='flex items-center'>
            <li><Link to='/wishlist'><Wishlist/></Link></li>
            <li><Link to='/accountIcon'><AccountIcon/></Link></li>
            <li><Link to='/cartIcon'><CartIcon /></Link></li>
          </ul>
        </div>
    </nav>

  )
}

export default Navigation
