import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia sx={{height:345}}
            image='https://images.squarespace-cdn.com/content/v1/5ec1febb58a4890157c8fbeb/19ebb9ed-4862-46e1-9f7c-4e5876730227/Beetroot-Burger.jpg'/>
        
        <CardContent>
            <Typography variant='h5'>
                Minidu Alwis Food
            </Typography>

            <Typography variant='body2'>
               50% off on your first order
            </Typography>

            <div className='py-2 space-y-2 '>

                <p>{"MOnaragala"}</p>
                <p className='text-sm text-red-500'>March 20, 2025 12.00 AM</p>
                <p className='text-sm text-green-600'>March 28, 2025 12.00 AM</p>

            </div>

        </CardContent>

      {false &&  <CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
        
        </Card>
    </div>
  )
}

export default EventCard