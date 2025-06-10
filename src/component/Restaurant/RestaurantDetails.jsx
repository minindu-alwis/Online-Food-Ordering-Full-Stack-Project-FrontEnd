import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
    Box,
    Chip,
    Card,
    CardContent,
    Avatar,
    Rating,
    Button,
    Skeleton
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';

const foodTypes = [
    { Label: "All Items", value: "all", icon: "🍽️" },
    { Label: "Vegetarian Only", value: "vegitarian", icon: "🥗" },
    { Label: "Non-Vegetarian", value: "non_vegitarian", icon: "🍖" },
    { Label: "Seasonal Specials", value: "seasonal", icon: "🌟" }
]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { auth, restaurant, menu } = useSelector((store) => store);
    const { id, city } = useParams();

    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }

    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name, value)
    }

    console.log("restaurant", restaurant);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getRestaurantById({ jwt, restaurantId: id }))
            await dispatch(getRestaurantsCategory({ jwt, restaurantId: id }))
            setLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: id,
            vagetarian: foodType === "vegitarian",
            nonveg: foodType === "non_vegitarian",
            seasonal: foodType === "seasonal",
            foodCategory: selectedCategory,
        }));
    }, [selectedCategory, foodType])

    if (loading) {
        return (
            <div className='px-5 lg:px-20 bg-black min-h-screen'>
                <Skeleton
                    variant="text"
                    height={60}
                    className="mt-10"
                    sx={{ bgcolor: 'grey.800' }}
                />
                <Skeleton
                    variant="rectangular"
                    height={300}
                    className="mt-5"
                    sx={{ bgcolor: 'grey.800' }}
                />
                <Skeleton
                    variant="text"
                    height={40}
                    className="mt-5"
                    sx={{ bgcolor: 'grey.800' }}
                />
                <Skeleton
                    variant="text"
                    height={20}
                    className="mt-2"
                    sx={{ bgcolor: 'grey.800' }}
                />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-black'>
            {/* Hero Section */}
            <section className='relative'>
                {/* Background with overlay */}
                <div className='absolute inset-0 bg-black'></div>

                <div className='relative z-20 px-5 lg:px-20 pt-10'>
                    {/* Breadcrumb */}
                    <Typography className='text-orange-400 py-2 backdrop-blur-sm bg-gray-900/40 px-4 rounded-full inline-block border border-orange-500/20'>
                        {restaurant.restaurant?.name}
                    </Typography>

                    {/* Image Gallery */}
                    <div className='mt-6'>
                        <Grid container spacing={3}>
                            {/* Auto-changing Image Gallery */}
                            <Grid item xs={12}>
                                <Card className='overflow-hidden shadow-2xl bg-gray-900 border border-orange-500/20 relative group'>
                                    {/* Gradient overlay */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10'></div>

                                    {/* Image info */}
                                    <div className='absolute bottom-4 left-4 z-20'>
                                        <div className='bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-orange-500/30'>
                                            <Typography className='text-white font-semibold text-lg'>
                                                {restaurant.restaurant?.name}
                                            </Typography>
                                            <Typography className='text-orange-400 text-sm'>
                                                Gallery View
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Auto-changing images */}
                                    <div className='relative w-full h-[50vh] overflow-hidden'>
                                        {restaurant.restaurant?.images.slice(0, 3).map((img, index) => (
                                            <img
                                                key={index}
                                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                style={{
                                                    animation: `fadeInOut 9s infinite ${index * 3}s`
                                                }}
                                                src={img}
                                                alt={`${restaurant.restaurant?.name} - Gallery ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Featured badge */}
                                    <div className='absolute top-4 right-4 z-20'>
                                        <div className='bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg'>
                                            ✨ Gallery
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Image counter with active indicator */}
                        <div className='flex justify-center mt-4 space-x-2'>
                            {[0, 1, 2].map((index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer transform ${index === 0 ? 'bg-orange-500 scale-125' : 'bg-gray-600'
                                        }`}
                                    style={{
                                        animation: `pulse 3s infinite ${index * 3}s`
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* CSS for animations */}
                        <style jsx>{`
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            16%, 84% { opacity: 1; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); background-color: #4b5563; }
            50% { transform: scale(1.25); background-color: #f97316; }
        }
    `}</style>
                    </div>

                    {/* Restaurant Info Card */}
                    <Card className='mt-8 shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-orange-500/20'>
                        <CardContent className='p-8'>
                            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-4 mb-4'>
                                        <Avatar className='bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 shadow-lg'>
                                            <RestaurantIcon className='text-2xl' />
                                        </Avatar>
                                        <div>
                                            <Typography variant='h3' className='font-bold text-white mb-2'>
                                                {restaurant.restaurant?.name}
                                            </Typography>
                                            <div className='flex items-center gap-2'>
                                                <Rating value={4.5} readOnly size="small"
                                                    sx={{
                                                        '& .MuiRating-iconFilled': {
                                                            color: '#f59e0b',
                                                        },
                                                        '& .MuiRating-iconEmpty': {
                                                            color: '#374151',
                                                        }
                                                    }}
                                                />
                                                <Typography className='text-gray-300'>
                                                    4.5 (250+ reviews)
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <Typography className='text-gray-300 text-lg mb-6 leading-relaxed'>
                                        {restaurant.restaurant?.description}
                                    </Typography>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='space-y-4'>
                                            <div className='flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-colors'>
                                                <LocationOnIcon className='text-orange-500' />
                                                <div>
                                                    <Typography className='font-medium text-white'>Location</Typography>
                                                    <Typography className='text-gray-400 text-sm'>
                                                        {restaurant.restaurant?.address?.streetAddress}, {restaurant.restaurant?.address?.city}, {restaurant.restaurant?.address?.stateProvince} - {restaurant.restaurant?.address?.country}
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors'>
                                                <AccessTimeIcon className='text-green-500' />
                                                <div>
                                                    <Typography className='font-medium text-white'>Opening Hours</Typography>
                                                    <Typography className='text-gray-400 text-sm'>
                                                        {restaurant.restaurant?.openingHours}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='space-y-4'>
                                            <div className='flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors'>
                                                <PhoneIcon className='text-blue-500' />
                                                <div>
                                                    <Typography className='font-medium text-white'>Contact</Typography>
                                                    <Typography className='text-gray-400 text-sm'>
                                                        +1 (555) 123-4567
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div className='flex gap-2 flex-wrap'>
                                                <Chip
                                                    label="Free Delivery"
                                                    sx={{
                                                        backgroundColor: '#16a34a',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: '#15803d' }
                                                    }}
                                                    size="small"
                                                />
                                                <Chip
                                                    label="30 min"
                                                    sx={{
                                                        backgroundColor: '#f59e0b',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: '#d97706' }
                                                    }}
                                                    size="small"
                                                />
                                                <Chip
                                                    label="₹200 for two"
                                                    sx={{
                                                        backgroundColor: '#dc2626',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: '#b91c1c' }
                                                    }}
                                                    size="small"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Menu Section */}
            <section className='pt-12 px-5 lg:px-20'>
                <div className='lg:flex gap-8'>
                    {/* Filter Sidebar */}
                    <div className='lg:w-[25%] mb-8 lg:mb-0'>
                        <Card className='sticky top-24 shadow-2xl bg-gray-900 border border-orange-500/20'>
                            <CardContent className='p-6'>
                                {/* Food Type Filter */}
                                <div className='mb-8'>
                                    <Typography variant='h5' className='font-bold text-white mb-4 flex items-center gap-2'>
                                        <RestaurantIcon className='text-orange-500' />
                                        Food Type
                                    </Typography>

                                    <FormControl component="fieldset" className='w-full'>
                                        <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                            {foodTypes.map((item) => (
                                                <div key={item.value} className='mb-2'>
                                                    <FormControlLabel
                                                        value={item.value}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#6b7280',
                                                                    '&.Mui-checked': {
                                                                        color: '#f59e0b',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <div className='flex items-center gap-2'>
                                                                <span className='text-lg'>{item.icon}</span>
                                                                <span className='font-medium text-gray-200'>{item.Label}</span>
                                                            </div>
                                                        }
                                                        className='hover:bg-gray-800/50 rounded-lg p-2 transition-colors border border-transparent hover:border-orange-500/20'
                                                    />
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <Divider className='my-6' sx={{ borderColor: '#374151' }} />

                                {/* Category Filter */}
                                <div>
                                    <Typography variant='h5' className='font-bold text-white mb-4 flex items-center gap-2'>
                                        <StarIcon className='text-yellow-500' />
                                        Food Category
                                    </Typography>

                                    <FormControl component="fieldset" className='w-full'>
                                        <RadioGroup
                                            onChange={handleFilterCategory}
                                            name="food_category"
                                            value={selectedCategory}
                                        >
                                            <div className='mb-2'>
                                                <FormControlLabel
                                                    value=""
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                color: '#6b7280',
                                                                '&.Mui-checked': {
                                                                    color: '#f59e0b',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={<span className='font-medium text-gray-200'>All Categories</span>}
                                                    className='hover:bg-gray-800/50 rounded-lg p-2 transition-colors border border-transparent hover:border-orange-500/20'
                                                />
                                            </div>
                                            {restaurant.categories?.map((item) => (
                                                <div key={item.name} className='mb-2'>
                                                    <FormControlLabel
                                                        value={item.name}
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#6b7280',
                                                                    '&.Mui-checked': {
                                                                        color: '#f59e0b',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={<span className='font-medium text-gray-200'>{item.name}</span>}
                                                        className='hover:bg-gray-800/50 rounded-lg p-2 transition-colors border border-transparent hover:border-orange-500/20'
                                                    />
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Menu Items */}
                    <div className='lg:w-[75%]'>
                        <div className='mb-6'>
                            <Typography variant='h4' className='font-bold text-white mb-2'>
                                Our Menu
                            </Typography>
                            <Typography className='text-gray-400'>
                                {menu.menuItems?.length || 0} items available
                            </Typography>
                        </div>

                        <div className='grid gap-6'>
                            {menu.menuItems?.length > 0 ? (
                                menu.menuItems.map((item, index) => (
                                    <div key={index} className='transform hover:scale-[1.02] transition-transform duration-300'>
                                        <MenuCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <Card className='p-8 text-center bg-gray-900 border border-gray-700'>
                                    <Typography variant='h6' className='text-gray-400 mb-2'>
                                        No items found
                                    </Typography>
                                    <Typography className='text-gray-500'>
                                        Try adjusting your filters to see more options
                                    </Typography>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetails