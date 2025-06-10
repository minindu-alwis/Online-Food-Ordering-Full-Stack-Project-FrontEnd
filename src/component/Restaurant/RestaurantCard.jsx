import { Card, Chip, IconButton, Rating } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';

const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { auth } = useSelector((store) => store);

    const handleAddToFavorite = (e) => {
        e.stopPropagation();
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    };

    const handleNavigateToRestaurant = () => {
        if(item.open){
            const restaurantName = (item.title || item.name || 'restaurant')
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');
                             
            const city = (item.address?.city || 'unknown')
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            navigate(`/restaurant/${city}/${restaurantName}/${item.id}`);
        }
    };

    // Mock data for demo (you can remove these and use your actual data)
    const rating = item.rating || 4.2;
    const reviewCount = item.reviewCount || 128;
    const deliveryTime = item.deliveryTime || '25-35';
    const cuisineType = item.cuisineType || 'Multi Cuisine';

    return (
        <Card 
            className="group w-[20rem] bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden border border-gray-100"
            onClick={handleNavigateToRestaurant}
            sx={{
                backgroundColor: '#ffffff',
                '&:hover': {
                    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.15)',
                }
            }}
        >
            <div className={`${item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative overflow-hidden`}>
                {/* Image with overlay gradient */}
                <div className="relative h-[12rem] overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={item.images?.[0] || '/default-restaurant.jpg'}
                        alt={item.title || item.name}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status chip */}
                    <Chip
                        size="small"
                        className="absolute top-3 left-3 backdrop-blur-sm font-semibold shadow-md"
                        sx={{
                            color: item.open ? '#16a34a' : '#dc2626',
                            backgroundColor: item.open ? '#f0fdf4' : '#fef2f2',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            border: item.open ? '1px solid #16a34a' : '1px solid #dc2626'
                        }}
                        label={item.open ? 'OPEN' : 'CLOSED'}
                    />

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-md backdrop-blur-sm">
                        <StarIcon sx={{ fontSize: 14 }} />
                        <span className="text-sm font-bold">{rating}</span>
                    </div>

                    {/* Favorite button with enhanced styling */}
                    <div className="absolute bottom-3 right-3">
                        <IconButton 
                            onClick={handleAddToFavorite}
                            className="bg-white shadow-md hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                            sx={{
                                width: 44,
                                height: 44,
                                backgroundColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#f9fafb',
                                    transform: 'scale(1.1)',
                                }
                            }}
                        >
                            {isPresentInFavorites(auth.favorites || [], item) ? (
                                <FavoriteIcon 
                                    sx={{ 
                                        color: '#ef4444', 
                                        fontSize: 22,
                                        filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))'
                                    }} 
                                />
                            ) : (
                                <FavoriteBorderIcon 
                                    sx={{ 
                                        color: '#6b7280', 
                                        fontSize: 22,
                                        '&:hover': { color: '#ef4444' }
                                    }} 
                                />
                            )}
                        </IconButton>
                    </div>
                </div>
            </div>

            {/* Enhanced content section */}
            <div className="p-5 space-y-4">
                {/* Restaurant name and cuisine */}
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1">
                            {item.title || item.name}
                        </h3>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-medium">
                            {cuisineType}
                        </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {item.description || 'Delicious food with amazing taste and quality ingredients'}
                    </p>
                </div>

                {/* Rating and reviews */}
                <div className="flex items-center gap-2">
                    <Rating
                        value={rating}
                        precision={0.1}
                        size="small"
                        readOnly
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#fbbf24'
                            }
                        }}
                    />
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                </div>

                {/* Location and delivery info */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <LocationOnIcon sx={{ fontSize: 16, color: '#dc2626' }} />
                        <span className="text-sm">
                            {item.address?.city || 'Location'}, {item.address?.streetAddress || 'State'}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                        <AccessTimeIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                        <span className="text-sm font-medium">{deliveryTime} mins</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm">Free delivery</span>
                    </div>
                </div>

                {/* Action section */}
                <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Owner</span>
                            <span className="text-lg font-bold text-emerald-600">Mr {item?.owner?.fullName || '500'}</span>
                        </div>
                        
                        <button 
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                item.open 
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105' 
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!item.open}
                        >
                            {item.open ? 'Order Now' : 'Closed'}
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;