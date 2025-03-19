import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarosalItems from './CarosalItems';

export const MultiItemCarosal = ({ topMeels }) => {
  // Slider settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping
    speed: 1000, // Increase transition speed for smoother effect
    slidesToShow: 4, // Show 4 slides at once in full mode
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 1500, // Auto-play interval in milliseconds
    arrows: false, // Show navigation arrows
    pauseOnHover: true, // Pause auto-play on hover
    cssEase: 'ease-in-out', // Smooth transition effect
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For screens smaller than 600px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {topMeels.map((item, index) => (
          <CarosalItems key={index} image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};