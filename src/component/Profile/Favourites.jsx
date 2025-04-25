import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';

export const Favourites = () => {
  const { auth } = useSelector((store) => store);

  // Transform favorite items to ensure consistent structure
  const transformedFavorites = auth.favorites?.map(restaurant => ({
    ...restaurant,
    name: restaurant.title || restaurant.name,
    // Ensure address exists with city
    address: restaurant.address || { city: 'unknown' },
    // Ensure images array exists
    images: restaurant.images || ['/default-restaurant.jpg'],
    // Ensure open status exists
    open: restaurant.open !== undefined ? restaurant.open : true
  })) || [];

  return (
    <div className="min-h-screen">
      <h1 className="py-5 text-xl font-semibold text-center">My Favourites</h1>

      <div className="flex flex-wrap gap-5 justify-center px-4">
        {transformedFavorites.length > 0 ? (
          transformedFavorites.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.id} 
              item={restaurant}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No favorites added yet</p>
        )}
      </div>
    </div>
  );
};