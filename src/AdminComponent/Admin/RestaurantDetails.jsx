import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/Action';


const RestaurantDetails = () => {

  const {restaurant} = useSelector((store) => store)
  console.log("restaurent detaiks",restaurant)
  const dispatch=useDispatch();
  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId:restaurant.userRestaurants.id,
      jwt:localStorage.getItem("jwt")
    }))
  }

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py- flex justify-center items-center gap-5'>

        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.userRestaurants?.name}</h1>

          <div>
          <Button
            color={restaurant.userRestaurants?.open ? "error" : "primary"}
            className="py-[1rem] px-[2rem]"
            variant="contained"
            onClick={handleRestaurantStatus}
            size="large"
          >
            {restaurant.userRestaurants?.open ? "Close" : "Open"}
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
                  {restaurant.userRestaurants?.owner.fullName}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Restaurant Name</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant.userRestaurants?.name}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Cuisine Type</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant.userRestaurants?.cuisineType}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Opening Hourse</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant.userRestaurants?.openingHours}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Status</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                    {restaurant.userRestaurants?.open? <span className=
                     'px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open
                     </span>:<span className=
                     'px-5 py-2 rounded-full bg-red-400 text-gray-950'>
                      Closed
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
                  {restaurant?.userRestaurants?.address?.streetAddress || "Country not available"}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>City</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant?.userRestaurants?.address?.city || "City not available"}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Postal Code</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant?.userRestaurants?.address?.postalCode || "Postal code not available"}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Street Address</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant?.userRestaurants?.address?.streetAddress || "Street not available"}
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
                  {restaurant?.userRestaurants?.contactInformation?.email || "No email"}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Mobile</p>
                 <p className='text-gray-400'>
                  <span  className='pr-5'>-</span>
                  {restaurant?.userRestaurants?.contactInformation?.mobile || "No mobile"}
                 </p>

                </div>


                 <div className='flex'>

                 <p className='w-48'>Social</p>
                      <div className='flex gap-2 text-gray-400 items-center pb-3'>
                        <span className='pr-5'>-</span>
                        <a href={restaurant?.userRestaurants?.contactInformation?.twitter}>
                          <InstagramIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href={restaurant?.userRestaurants?.contactInformation?.twitter}>
                          <TwitterIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href={restaurant?.userRestaurants?.contactInformation?.twitter}>
                          <FacebookIcon sx={{fontSize:"3rem"}}/>
                        </a>

                        <a href={restaurant?.userRestaurants?.contactInformation?.twitter}>
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