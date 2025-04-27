import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div className="flex justify-center p-4">
      <Card 
        sx={{
          width: 345, 
          borderRadius: 4,
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
          }
        }}
      >
        <CardMedia 
          sx={{
            height: 220,
            transition: 'opacity 0.5s ease',
            '&:hover': {
              opacity: 0.9
            }
          }}
          image='https://images.squarespace-cdn.com/content/v1/5ec1febb58a4890157c8fbeb/19ebb9ed-4862-46e1-9f7c-4e5876730227/Beetroot-Burger.jpg'
        />
        
        <CardContent>
          <Typography variant='h5' sx={{fontWeight:'bold', textAlign:'center'}}>
            Minidu Alwis Food
          </Typography>

          <Typography 
            variant='body2' 
            sx={{
              color:'red', 
              fontWeight:'bold', 
              textAlign:'center',
              animation: 'pulse 1.5s infinite'
            }}
          >
            50% off on your first order
          </Typography>

          <div className='py-3 space-y-1 text-center'>
            <p className="text-gray-700 font-medium">{"Monaragala"}</p>
            <p className="text-sm text-red-500">March 20, 2025 - 12.00 AM</p>
            <p className="text-sm text-green-600">March 28, 2025 - 12.00 AM</p>
          </div>
        </CardContent>

        <CardActions sx={{justifyContent:'center'}}>
          <IconButton sx={{
            color: 'red',
            '&:hover': {
              color: 'darkred',
              transform: 'scale(1.2)',
              transition: '0.3s'
            }
          }}>
            <DeleteIcon/>
          </IconButton>
        </CardActions>

      </Card>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

    </div>
  )
}

export default EventCard
