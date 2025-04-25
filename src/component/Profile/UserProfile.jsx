import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../State/Authentication/Action';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(state => state.auth);

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return (
      <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
        <CircularProgress />
        <p className='mt-4'>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className='py-5 text-2xl font-semibold'>Error Loading Profile</h1>
        <p className='text-red-500'>{error}</p>
        <Button 
          variant='contained' 
          onClick={() => dispatch(getUser())} 
          sx={{ margin: "2rem 0rem" }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        {user ? (
          <>
            <h1 className='py-5 text-2xl font-semibold'>
              {user.firstName} {user.lastName}
            </h1>
            <p>Email: {user.email}</p>
            <Button 
              variant='contained' 
              onClick={handleLogout} 
              sx={{ margin: "2rem 0rem" }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;