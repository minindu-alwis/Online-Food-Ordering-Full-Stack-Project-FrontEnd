import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Label } from '@mui/icons-material';
import MenuCard from './MenuCard';



const categories=[
    "pizza","biriyani","burger","chicken","Thai","rice"
]

const foodTypes=[
    {Label:"All",value:"all"},
    {Label:"Vegitarian only",value:"vegitarian"},
    {Label:"Non-Vegitarian",value:"non_vegitarian"},
    {Label:"Seasonal",value:"seasonal"}
]

const menu=[1,1,1,1,1,1,1]

const RestaurantDetails = () => {

    const [foodType,setFoodType]=useState("all");
    const handleFilter=(e)=>{
        console.log(e.target.value,e.target.name)
    }

    return (
        <div className='px-5 lg:px-20'>

            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/india/indian fast food/3 </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src="https://media.gettyimages.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=gi&k=20&c=SFRYlKrWD84RMNV_c8fIliBep7WHoV-0s6IBc5FJsmE="
                                alt="" />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgwWivilxxH1eAitAAZhuVpA-UV8ldD3VWg&s"
                                alt="" />
                        </Grid>


                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s"
                                alt="" />
                        </Grid>


                    </Grid>
                </div>

                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>Indian Fast Food</h1>
                    
                    <p className='text-gray-500 mt-1'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia nemo deserunt aspernatur quisquam pariatur amet itaque ipsam, doloremque nihil porro voluptas sunt exercitationem ipsum dolore facere excepturi. Nesciunt, aperiam praesentium?
                    </p>


                    <div className='space-y-3 mt-3'>
                    <p className='text-gray-500 flex items-center gap-3'>
                       

                       <LocationOnIcon/>
                        <span>
                       Mumbat , maharastarts
                        </span> 
                        </p>


                        <p className='text-gray-500 flex items-center gap-3'>
                       

                       <CalendarMonthIcon/>
                        <span>
                        Mon - Sun: 9:00 AM - 9:00 PM (Today)
                        </span> 
                        </p>

                    </div>
                    

                
                
                </div>
            </section>




        <Divider/>
        <section className='pt-[2rem] lg:flex relative'>

            <div className='space-y-10 lg:w-[20%] filter'>
                
                <div className='box space-y-5 lg:sticky top-28  p-5 shadow-md'>
                   
                   <div>
                        <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                            Food Type
                        </Typography>

                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                {foodTypes.map((item)=>( 
                                    <FormControlLabel
                                    key={item.value}
                                 value={item.value}
                                  control={<Radio />}
                                   label={item.Label} />))}
                            </RadioGroup>
                        </FormControl>


                    </div>
                    <Divider/>
                    <div>
                        <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                            Food Category
                        </Typography>

                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                {categories.map((item)=>( 
                                    <FormControlLabel
                                    key={item}
                                 value={item}
                                  control={<Radio />}
                                   label={item} />))}
                            </RadioGroup>
                        </FormControl>


                    </div>


               
               
                
                </div>
            </div>


            <div className='space-y-5 lg:w-[80%] lg:pl-10'>

                {menu.map((item)=><MenuCard/>)}

            </div>

        </section>

        </div>
    )
}

export default RestaurantDetails 