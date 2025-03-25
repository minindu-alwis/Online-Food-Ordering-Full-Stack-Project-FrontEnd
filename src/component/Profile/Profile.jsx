import React, { useState } from 'react'
import ProfileNavigations from './ProfileNavigations'
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Address from './Address';
import {Events} from './Events';
import { favorites } from './favorites';  



const Profile = () => {

    const [openSideBar,setOpenSideBar]=useState(false);

  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
        <ProfileNavigations open={openSideBar}/>
        </div>

        <div className='lg:w-[80%]'>

            <Routes>
                <Route path='/' element={<UserProfile/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/address' element={<Address/>}/>
                <Route path='/favorites' element={<favorites/>}/>
                <Route path='/events' element={<Events/>}/>
                
                
            </Routes>

        </div>
        
    </div>
  )
}

export default Profile