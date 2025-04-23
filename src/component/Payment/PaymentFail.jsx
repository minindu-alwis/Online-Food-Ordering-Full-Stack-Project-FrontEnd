import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';

const PaymentFail = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Create animated background elements
    const container = containerRef.current;
    if (!container) return;
    
    // Number of elements to create
    const elementCount = 15;
    
    // Remove any existing animations if component re-renders
    const existingElements = container.querySelectorAll('.error-icon');
    existingElements.forEach(icon => icon.remove());
    
    // Create and animate error icons
    for (let i = 0; i < elementCount; i++) {
      const icon = document.createElement('div');
      icon.className = 'error-icon absolute text-red-500 opacity-10';
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      icon.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
      icon.style.animationDelay = `${Math.random() * 15}s`;
      
      const errorSymbol = document.createElement('div');
      errorSymbol.innerHTML = '✕';
      errorSymbol.className = 'text-4xl font-bold';
      icon.appendChild(errorSymbol);
      
      container.appendChild(icon);
    }
    
    // Cleanup on unmount
    return () => {
      const icons = container.querySelectorAll('.error-icon');
      icons.forEach(icon => icon.remove());
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center p-4" ref={containerRef}>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
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
        
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          transform: translate3d(0, 0, 0);
        }
        
        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }
          
          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }
          
          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      `}</style>
      
      {/* Floating X signs in background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-red-500 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 20}s`
            }}
          >
            <ReportProblemIcon sx={{ fontSize: `${Math.random() * 4 + 2}rem` }} />
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative z-10 border border-red-100 shake">
        {/* Failure Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 py-8 px-4 text-center">
          <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4 shadow-lg pulse">
            <CancelIcon className="text-red-500" sx={{ fontSize: "4rem" }} />
          </div>
          <h1 className="text-white text-3xl font-bold">Payment Failed</h1>
          <p className="text-red-100 mt-2">Your transaction could not be processed</p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-700 text-lg">
              We're sorry, but there was an issue processing your payment.
            </p>
            <div className="flex items-center justify-center gap-1 text-red-600 font-medium mt-4">
              <ReportProblemIcon />
              <span>Transaction unsuccessful</span>
            </div>
          </div>
          
          {/* Error details box */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-700 text-sm mb-6">
            <p className="font-medium">Possible reasons:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Insufficient funds</li>
              <li>Card expired or invalid</li>
              <li>Bank declined the transaction</li>
              <li>Network connection issue</li>
            </ul>
          </div>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-red-500">
                <ReportProblemIcon />
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition duration-300 shadow-sm hover:shadow"
            >
              <HomeIcon className="mr-2" fontSize="small" />
              <span className="font-medium">Back Home</span>
            </button>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition duration-300 shadow-sm hover:shadow"
            >
              <RefreshIcon className="mr-2" fontSize="small" />
              <span className="font-medium">Try Again</span>
            </button>
          </div>
          
          {/* Help message */}
          <div className="text-center mt-6 text-gray-500">
            Need help? <button className="text-red-600 font-medium hover:underline">Contact support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;