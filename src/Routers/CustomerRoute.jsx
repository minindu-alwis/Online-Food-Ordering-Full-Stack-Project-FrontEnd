import React from 'react'
import { NavBar } from '../component/NavBar/NavBar'  // Fix: Use correct case
import { Route, Routes } from 'react-router-dom'
import { Home } from '../component/Home/Home'  // Fix: Use named import
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import PaymentSuccsess from '../component/Payment/PaymentSuccsess'
import PaymentFail from '../component/Payment/PaymentFail'

export const CustomerRoute = () => {
  return (
    <div>
        <NavBar/>  {/* Fix: Use correct case */}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccsess/>}/>
            <Route path='/payment/fail' element={<PaymentFail/>}/>
        </Routes>
        <Auth/>
    </div>
  )
}
