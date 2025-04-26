import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuTable from '../Menu/MenuTable';
import { Grid } from '@mui/material';
import OrderTable from '../Orders/OrderTable';

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const orders = restaurantOrder?.orders || [];
  const restaurantData = restaurant?.userRestaurants || {};
  const categories = restaurant?.categories || [];

  const jwt = localStorage.getItem('jwt');
  const restaurantId = restaurantData?.id;

  useEffect(() => {
    if (restaurantId) {
      dispatch({
        type: 'FETCH_RESTAURANT_ORDERS',
        payload: { jwt, restaurantId },
      });

      dispatch({
        type: 'GET_RESTAURANTS_CATEGORY',
        payload: { jwt, restaurantId },
      });

      dispatch({
        type: 'GET_RESTAURANT',
        payload: { jwt, restaurantId },
      });
    }
  }, [restaurantId, jwt, dispatch]);

  // Calculate dashboard metrics
  const totalRevenue = orders.reduce(
    (total, order) =>
      order.orderStatus === 'DELIVERED' ? total + (order.totalPrice || 0) : total,
    0
  );

  const pendingOrders = orders.filter((order) => order.orderStatus === 'PENDING').length;
  const deliveredOrders = orders.filter((order) => order.orderStatus === 'DELIVERED').length;
  const totalOrders = orders.length;

  // Recent orders (last 5)
  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {restaurantData?.name || 'Restaurant'} Dashboard
              </h1>
              <p className="mt-2 text-indigo-100">
                {restaurantData?.description || 'Restaurant management dashboard'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="text-sm text-indigo-200">
                {restaurantData?.openingHours || 'Opening hours not set'}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  restaurantData?.open
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {restaurantData?.open ? 'Open Now' : 'Closed'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                  <p className="text-2xl font-semibold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                  <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-yellow-100 p-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                  <p className="text-2xl font-semibold text-gray-900">{pendingOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivered Orders Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
                  <p className="text-2xl font-semibold text-gray-900">{deliveredOrders}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Restaurant Info Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Restaurant Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-lg text-gray-800">{restaurantData?.name || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-gray-800">{restaurantData?.description || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cuisine Type</h3>
                  <p className="text-gray-800">{restaurantData?.cuisineType || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-gray-800">
                    {restaurantData?.contactInformation?.email || 'No email'} | {restaurantData?.contactInformation?.mobile || 'No phone'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu Categories</h2>
              {categories.length > 0 ? (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-800">{category.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No categories available</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer?.fullName || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{order.totalPrice || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.orderStatus === 'DELIVERED' 
                              ? 'bg-green-100 text-green-800' 
                              : order.orderStatus === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No recent orders</p>
            )}
          </div>
        </div>
      </div>

    </div>
    

  );
};

export default RestaurantDashboard;