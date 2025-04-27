import { Button, Card, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

const AnimatedCard = styled(Card)({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  }
});

const StatusButton = styled(Button)(({ status }) => ({
  textTransform: 'none',
  borderRadius: '20px',
  padding: '4px 12px',
  fontWeight: '600',
  cursor: 'default',
  animation: 'pulse 2s infinite',
  backgroundColor: 
    status === 'DELIVERED' ? '#4caf50' :
    status === 'PENDING' ? '#ff9800' :
    status === 'OUT_FOR_DELIVERY' ? '#2196f3' : '#9e9e9e',
  color: 'white',
  '&:hover': {
    backgroundColor: 
      status === 'DELIVERED' ? '#4caf50' :
      status === 'PENDING' ? '#ff9800' :
      status === 'OUT_FOR_DELIVERY' ? '#2196f3' : '#9e9e9e',
  }
}));

const FoodImage = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '8px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(2deg)'
  }
});

const OrderCard = ({ item, order }) => {
  const statusColors = {
    PENDING: 'orange',
    DELIVERED: 'green',
    OUT_FOR_DELIVERY: 'blue',
    CANCELLED: 'red'
  };

  return (
    <AnimatedCard 
      className='flex justify-between items-center p-5 mb-4'
      sx={{
        borderLeft: `4px solid ${statusColors[order.orderStatus] || 'gray'}`,
        '@keyframes pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.8 },
          '100%': { opacity: 1 }
        }
      }}
    >
      <div className='flex items-center space-x-5'>
        <FoodImage 
          src={item.food.images[0]} 
          alt={item.food.name} 
        />
        <div>
          <Typography variant="subtitle1" fontWeight="600">
            {item.food.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Qty: {item.quantity}
          </Typography>
          <Typography variant="h6" fontWeight="700" color="primary">
            Rs {item.totalPrice}.00
          </Typography>
        </div>
      </div>

      <div>
        <StatusButton 
          status={order.orderStatus}
          sx={{
            animation: 'pulse 2s infinite'
          }}
        >
          {order.orderStatus.split('_').join(' ')}
        </StatusButton>
      </div>
    </AnimatedCard>
  );
};

export default OrderCard;