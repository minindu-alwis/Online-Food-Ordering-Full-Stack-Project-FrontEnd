import React, { useEffect, useState } from 'react';
import "./Home.css";
import { MultiItemCarosal } from './MultiItemCarosal';
import { topMeels } from './TopMeal';
import RestaurantCard from '../Restaurant/RestaurantCard';

const restaurant = [1, 1, 1, 1, 1, 1, 1, 1]

const texts = [
  "Savor the Flavor, Anytime, Anywhere!",
  "Deliciousness Delivered to Your Doorstep!",
  "Taste the Magic of Minidu Food!",
  "Your Cravings, Our Passion – Order Now!",
  "Fresh, Fast, and Irresistibly Tasty!",
  "Where Every Bite Tells a Story!",
  "Food That Feels Like Home!",
  "Order. Eat. Repeat. Minidu Food!",
  "Crave It? We Have It – Minidu Food!",
  "Your Favorite Meals, Just a Click Away!",
  "Minidu Food: Because Good Food Shouldn’t Wait!",
  "Satisfy Your Hunger, One Order at a Time!",
  "From Our Kitchen to Your Table – Minidu Food!",
  "Taste the Difference with Minidu Food!",
  "Hungry? Minidu Food Has You Covered!",
];

export const Home = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='pb-10'>
      {/* Banner Section with Background Video */}
      <div className='relative h-screen'>
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className='absolute top-0 left-0 w-full h-full object-cover z-0'
        >
          <source
            src="/videos/123.mp4" // Path to your video file
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-10'>
          {texts.map((text, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-in-out text-overlay ${index === currentTextIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                }`}
            >
              <h1>{text}</h1>
              <p>Order Now ! and Enjoy With Your Order !!!</p>
            </div>
          ))}
        </div>

        {/* Overlay for better text visibility */}
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-5'></div>
      </div>

      {/* MultiItemCarosal Section */}
      <div>
        <section className='p-10 lg:py-10 lg:px-20'>
          <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
          <MultiItemCarosal topMeels={topMeels} />
        </section>
      </div>

      <section className='px-5 lg:px-20 pt-10'>

        <h1 className='text-2xl font-semibold text-gray-400 pb-8'>
          Order From Handpicked Favourites
        </h1>

        <div className='flex flex-wrap items-center justify-around gap-5'>

          {
            restaurant.map((item) => <RestaurantCard />)
          }

        </div>

      </section>

    </div>
  );
};