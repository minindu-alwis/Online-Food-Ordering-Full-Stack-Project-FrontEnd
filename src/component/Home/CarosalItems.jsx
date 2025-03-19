import React from 'react';

const CarosalItems = ({ image, title }) => {
    return (
      <div className='flex flex-col justify-center items-center p-4'>
        <img
          className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center shadow-lg'
          src={image}
          alt={title}
        />
        <span className='py-5 font-semibold text-xl text-gray-700'>{title}</span>
      </div>
    );
  };
  
  export default CarosalItems;