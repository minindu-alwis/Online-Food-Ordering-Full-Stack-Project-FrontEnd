import { Card, Chip , IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const RestaurantCard = () => {
  return (
    <Card className='w-[18rem]'>
        
        <div className={`${true?'cursor-pointer':"cursor-not-allowed"} relative`}>

            <img className='w-full h-[10rem] rounded-t-md object-cover' src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/12/bd/f6/an-overview-of-the-restaurant.jpg?w=600&h=-1&s=1"
             alt="" />

             <Chip size='small'
             className='absolute top-2 left-2'
             color={true?"success":"error"}
             label={true?"open":"closed"}
             />

            

        </div>

        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p className='font-semibold text-lg'>Minidu Alwis</p>
                <p className='text-gray-500 text-sm'>
                    best restaurant in the workdls ...wlcome
                </p>
            </div>

            <div>
                
                <IconButton>
                    {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                </IconButton>
            </div>

        </div>


    </Card>
  )
}

export default RestaurantCard