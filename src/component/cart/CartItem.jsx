import React from 'react'
import { Chip, Divider , IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = ({item}) => {
  return (
    <div className='px-5'>
        <div className='lg:flex items-center lg:space-x-5'>

            <div>
                <img className='w-[5rem] h-[5rem] object-cover' 
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/a0/60/f3/salamina.jpg?w=900&h=500&s=1" 
                alt="" />
            </div>

            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>
                    <p>Biriyani</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-1'>

                    <IconButton>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <div className='w-5 h-5 text-xs flex items-center justify-center'>
                        {555}
                    </div>

                    <IconButton>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                          
                        </div>
                    </div>

                </div>
                <p className="ml-7">Rs {item.totalPrice}</p>

            </div>

        </div>
        
        <div className='pt-3 space-x-2'>

            {[1,1,1].map((item)=><Chip label={"bread"}/>)}

        </div>

    </div>
  )
}

export default CartItem