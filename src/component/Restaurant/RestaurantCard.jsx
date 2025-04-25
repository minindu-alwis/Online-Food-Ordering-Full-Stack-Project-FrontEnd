import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
        e.stopPropagation(); // Prevent navigation when clicking favorite button
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    };

    const handleNavigateToRestaurant = () => {
        if(item.open){
            // Use slug-friendly URL path
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

    return (
        <Card className="w-[18rem]" onClick={handleNavigateToRestaurant}>
            <div className={`${item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img
                    className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.images?.[0] || '/default-restaurant.jpg'}
                    alt={item.title || item.name}
                />

                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? 'success' : 'error'}
                    label={item.open ? 'open' : 'closed'}
                />
            </div>

            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p className="font-semibold text-lg cursor-pointer">
                        {item.title || item.name}
                    </p>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                </div>

                <div>
                    <IconButton onClick={handleAddToFavorite}>
                        {isPresentInFavorites(auth.favorites || [], item) ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;