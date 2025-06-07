import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const { userRestaurants } = useSelector((store) => store.restaurant)
  console.log(userRestaurants)

  return (
    <div>
      <Routes>
        <Route 
          path='/*' 
          element={!userRestaurants 
            ? <CreateRestaurantForm /> 
            : <Admin />} 
        />
      </Routes>
    </div>
  )
}

export default AdminRoute
