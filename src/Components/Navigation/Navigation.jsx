import React from 'react'
import Wishlist from '../common/Wishlist'
import AccountIcon from '../common/AccountIcon'
import CartIcon from '../common/CartIcon'

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
            <li className='/'><a href='/'>Shop</a></li>
            <li className='/mens'><a href='/'>Men</a></li>
            <li className='/womens'><a href='/'>Women</a></li>
            <li className='/kids'><a href='/'>Kids</a></li>
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
            <li><button href='/'><Wishlist/></button></li>
            <li><button><AccountIcon/></button></li>
            <li><button><CartIcon /></button></li>
          </ul>
        </div>
    </nav>

  )
}

export default Navigation
