import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {
    
  }

  return (
    <div className='lg:px-20 px-5 pb-10'>
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
                     'px-5 py-2 rounded-full bg-red-400 text-gray-950'>Closed
                     </span>}
                 </p>

                </div>

              </div>
            </CardContent>

          </Card>
        </Grid>


        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title=
            {<span className='text-gray-300'>Address</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>

                 <p className='w-48'>Country</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>City</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Postal Code</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Street Address</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


              </div>
            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title=
            {<span className='text-gray-300'>Contact</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>

                <div className='flex'>

                 <p className='w-48'>Email</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Mobile</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                     Best Foods Minidu
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Social</p>
                      <div className='flex gap-2 text-gray-400 items-center pb-3'>
                        <span className='pr-5'>-</span>
                        <a href='/'>
                          <InstagramIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href='/'>
                          <TwitterIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href='/'>
                          <FacebookIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href='/'>
                          <LinkedInIcon sx={{fontSize:"3rem"}}/>
                        </a>
                      </div>
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