import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card, CardActionArea, Modal } from '@mui/material';

export const AddressCard = ({item,showButton,handleSelectAddress}) => {
    const handleAddressSelection=()=>{


    }
  return (
    <Card className="flex gap-5 w-64 p-5">
        <HomeIcon/>
        <div className='space-y-3 text-gray-500'>
            <h1 className='font-semibold  text-lg text-white'>Home</h1>
            <p>
                No 156, 3RD Lane , Kumarapura , Hulandawa , Monaragala
            </p>

           {showButton && (<Button variant='outlined' fullWidth  onClick={()=>handleSelectAddress(item)}>Select</Button>)}

        </div>
    </Card>

  )
}
