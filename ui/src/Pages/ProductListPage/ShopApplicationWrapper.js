import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'

const ShopApplicationWrapper = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default ShopApplicationWrapper
