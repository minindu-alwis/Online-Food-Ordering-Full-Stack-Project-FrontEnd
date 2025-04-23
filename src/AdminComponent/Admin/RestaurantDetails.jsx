import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'

const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {
    
  }

  return (
    <div className='lg:px-20 px-5'>
      <div className='py- flex justify-center items-center gap-5'>

        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          Minidu Food</h1>

          <div>
            <Button
             color={true?"primary":"error"}
              className='py-[1rem] px-[2rem]' 
              variant='contained'
               onClick={handleRestaurantStatus} size="large">
              {true?"Open":"Close"}
            </Button>
          </div>

      </div>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Card>
            <CardHeader title=
            {<span className='text-gray-300'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>

                 <p className='w-48'>Owner</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Restaurant Name</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Cuisine Type</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Opening Hourse</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Status</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                    {true? <span className=
                     'px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open
                     </span>:<span className=
                     'px-5 py-2 rounded-full bg-red-400 text-gray-50'>Closed
                     </span>}
                 </p>

                </div>

              </div>
            </CardContent>

          </Card>
        </Grid>

      </Grid>

    </div>
  )
}

export default RestaurantDetails