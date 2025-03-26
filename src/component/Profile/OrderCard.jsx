import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16' 
            src="https://www.certifiedangusbeef.com/_next/image?url=https%3A%2F%2Fappetizing-cactus-7139e93734.media.strapiapp.com%2FClassic_Smashed_Burger_111c4bfdb7.jpeg&w=3840&q=75"
            alt="" />
            <div>
                <p>Burger</p>
                <p>Rs 250</p>
            </div>

        </div>

        <div>
            <Button className="cursor-not-allowed">
                completed
            </Button>
        </div>

    </Card>
  )
}

export default OrderCard