import React, { useState } from 'react'
import ProfileNavigations from './ProfileNavigations'

const Profile = () => {

    const [openSideBar,setOpenSideBar]=useState(false);

  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
        <ProfileNavigations open={openSideBar}/>
        </div>

        <div className='lg:w-[80%]'>

        </div>
        
    </div>
  )
}

export default Profile