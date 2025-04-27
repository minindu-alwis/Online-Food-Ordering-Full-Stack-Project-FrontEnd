import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { yellow } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./NavBar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/store';

export const NavBar = () => {
    const {auth,cart}=useSelector(store=>store)
    const navigate=useNavigate()
    const handleAvatarClick=()=>{
        if(auth.user?.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        }else{
            navigate("/admin/restaurants")
        }
    }

    return (
        <div>
            <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-black lg:px-20 flex justify-between'
                sx={{
                    borderBottom: '2px solid #ffeb3b',
                    boxShadow: '0 2px 10px rgba(255, 235, 0, 0.3)'
                }}>

                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li onClick={()=>navigate("/")} 
                        className='logo font-semibold text-yellow-400 text-2xl'
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        Minidu Food
                    </li>
                </div>

                <div className='flex items-center space-x-2 lg:space-x-10'>

                    <div className=''>
                        <IconButton sx={{ color: yellow[400] }}>
                            <SearchIcon sx={{fontSize:"1.5rem"}}/>
                        </IconButton>
                    </div>
                    
                    <div className=''>
                        {auth.user ? (
                            <Avatar 
                                onClick={handleAvatarClick} 
                                sx={{
                                    bgcolor: yellow[700],
                                    color: 'black',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: yellow[600]
                                    }
                                }}>
                                {auth.user?.fullName[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <IconButton 
                                onClick={()=>navigate("/account/login")}
                                sx={{ color: yellow[400] }}>
                                <Person/>
                            </IconButton>
                        )}
                    </div>

                    <div className=''>
                        <IconButton 
                            onClick={()=>navigate("/cart")}
                            sx={{ color: yellow[400] }}>
                            <Badge 
                                color='primary' 
                                badgeContent={cart.cart?.items.length}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: yellow[700],
                                        color: 'black'
                                    }
                                }}>
                                <AddShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
                            </Badge>
                        </IconButton>
                    </div>

                </div>
            </Box>
        </div>
    )
}