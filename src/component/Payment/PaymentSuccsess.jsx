import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDispatch } from 'react-redux';
import { clearCart } from '../State/Cart/Action';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const dispatch= useDispatch();
  const jwt = localStorage.getItem("jwt");

   // Clear cart only once when component mounts
   useEffect(() => {
    if (jwt) {
      dispatch(clearCart(jwt));
      console.log("✅ Cart cleared after payment success");
    }
  }, [dispatch, jwt]); // Add dependencies to prevent multiple dispatches

  
  useEffect(() => {

  
    // Create floating money icons animation
    const container = containerRef.current;
    if (!container) return;
    
    // Number of money icons to create
    const iconCount = 20;
    
    // Remove any existing animations if component re-renders
    const existingIcons = container.querySelectorAll('.money-icon');
    existingIcons.forEach(icon => icon.remove());
    
    // Create and animate money icons
    for (let i = 0; i < iconCount; i++) {
      const icon = document.createElement('div');
      icon.className = 'money-icon absolute text-green-500 opacity-20';
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      icon.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
      icon.style.animationDelay = `${Math.random() * 15}s`;
      
      const moneyIcon = document.createElement('div');
      moneyIcon.innerHTML = '$';
      moneyIcon.className = 'text-4xl font-bold';
      icon.appendChild(moneyIcon);
      
      container.appendChild(icon);
    }
    
    // Cleanup on unmount
    return () => {
      const icons = container.querySelectorAll('.money-icon');
      icons.forEach(icon => icon.remove());
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center p-4" ref={containerRef}>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: rotate(30deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% {
            transform: scale(0) rotate(30deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(30deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(30deg);
            opacity: 0;
          }
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      
      {/* Floating coins background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-yellow-500 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 20}s`
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: `${Math.random() * 4 + 2}rem` }} />
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative z-10 border border-emerald-100">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-8 px-4 text-center shine-effect">
          <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4 shadow-lg pulse">
            <CheckCircleIcon className="text-emerald-500" sx={{ fontSize: "4rem" }} />
          </div>
          <h1 className="text-white text-3xl font-bold">Payment Successful!</h1>
          <p className="text-emerald-100 mt-2">Your transaction has been processed</p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-700 text-lg">
              Thank you for choosing our restaurant! Your order has been confirmed.
            </p>
            <div className="flex items-center justify-center gap-1 text-emerald-600 font-medium mt-4">
              <AttachMoneyIcon />
              <span>Transaction completed successfully</span>
            </div>
          </div>
          
          {/* Divider with dollar sign */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-emerald-500">
                <AttachMoneyIcon />
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => navigate('/my-profile/orders')}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition duration-300 shadow-sm hover:shadow"
            >
              <ReceiptLongIcon className="mr-2" fontSize="small" />
              <span className="font-medium">View Order</span>
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition duration-300 shadow-sm hover:shadow"
            >
              <HomeIcon className="mr-2" fontSize="small" />
              <span className="font-medium">Back Home</span>
            </button>
          </div>
          
          {/* Extra message */}
          <div className="text-center mt-6 text-emerald-600 font-medium">
            Have a wonderful dining experience!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;