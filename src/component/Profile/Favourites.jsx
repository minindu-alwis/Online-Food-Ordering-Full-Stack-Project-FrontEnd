import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';

export const Favourites = () => {
  const { auth } = useSelector((store) => store);

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favourites</h1>

      <div className="flex flex-wrap gap-5 justify-center">
        {/* Add fallback for auth.favorites */}
        {(auth.favorites || []).map((item) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
