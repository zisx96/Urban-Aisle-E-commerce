import React from 'react'
import Wishlist from '../common/Wishlist'
import AccountIcon from '../common/AccountIcon'
import CartIcon from '../common/CartIcon'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css';
import { useSelector } from 'react-redux'
import { countCartItems } from '../../store/features/cart'

const Navigation = ({variant="default"}) => {

  const cartLength = useSelector(countCartItems);

  return (
   
    <nav className='flex items-center py-6 px-16 justify-between gap-40'>
        <div className='flex items-center gap-6'>
            {/* {logo} */}
            <a href='/' className='text-3xl text-black gap-8 font-mono'>Urban Aisle</a>
        </div>
        { variant === "default" && 
        <div className='flex flex-wrap items-center gap-10 flex-1'>
            {/* {Navigation Items} */}
          <ul className='flex gap-14 text-black hover:text-gray-500' >
            <li ><NavLink to='/' className={({isActive})=> isActive ? 'active-link' : ''}>Shop</NavLink></li>
            <li ><NavLink to='/men' className={({isActive})=> isActive ? 'active-link' : ''}>Men</NavLink></li>
            <li ><NavLink to='/women' className={({isActive})=> isActive ? 'active-link' : ''}>Women</NavLink></li>
            <li ><NavLink to='/kid' className={({isActive})=> isActive ? 'active-link' : ''}>Kids</NavLink></li>
          </ul>
        </div>
        }
        { variant === "default" && 
        <div className='flex-justify-center'>
          {/* search Bar */}
          <div className='border rounded flex overflow-hidden'>
            <div className='flex items-center justify-center px-4 border-1'>
              <input type='text' className='px-4 py-2 outline-none' placeholder="Search"/>
            </div>
          </div>
        </div>
        }
        <div className='flex flex-wrap items-center gap-4'>
          {/* action Items */}
          { variant === "default" &&
          <ul className='flex items-center'>
            <li><Link to='/wishlist'><Wishlist/></Link></li>
            <li><Link to='/accountIcon'><AccountIcon/></Link></li>
            <li><Link to='/cart-items' className='flex flex-wrap'><CartIcon />
            { cartLength > 0 && <div className='absolute ml-6 inline-flex items-center justify-center h-6 w-6 bg-black text-white rounded-full border-2 text-xs border-white'>
                {cartLength}
            </div>
            }
            </Link></li>
          </ul>}
          {
            variant === "authentication" &&
            <uL className='flex gap-8'>
              <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'>
                <NavLink to={"/v1/login"} className={({isActive})=> isActive ? 'active-link' : ''}>
                  Login
                </NavLink>
              </li>

              <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'>
                <NavLink to={"/v1/register"} className={({isActive})=> isActive ? 'active-link' : ''}>
                  SignUp
                </NavLink>
              </li>

            </uL>
          }
        </div>
    </nav>

  )
}

export default Navigation
