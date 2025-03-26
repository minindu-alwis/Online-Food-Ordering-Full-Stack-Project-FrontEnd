import { Avatar, Badge, Box, IconButton, responsiveFontSizes } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./NavBar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/store';

export const NavBar = () => {
    const {auth}=useSelector(store=>store)
    const navigate=useNavigate()
  return (
    <div>
        <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>

           
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li className='logo font-semibold text-gray-300 text-2xl'>
                        Minidu Food
                    </li>

                </div>

            <div className='flex items-center space-x-2 lg:space-x-10'>

                <div className=''>
                    <IconButton >
                        <SearchIcon sx={{fontSize:"1.5rem"}}/>
                    </IconButton>
                </div>
                <div className=''>

                    {auth.user?<Avatar sx={{bgcolor:"white",color:pink.A400}}>
                        
                        {auth.user?.fullName[0].toUpperCase()}
                        
                        </Avatar>:
                    <IconButton onClick={()=>navigate("/account/login")}>
                        <Person/>
                    </IconButton>}

                </div>

                <div className=''>
                
                <IconButton >
                <Badge color='primary' badgeContent={3}>
                        <AddShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
                        </Badge>
                    </IconButton>
                </div>

            </div>


        </Box>
    </div>
  )
}
