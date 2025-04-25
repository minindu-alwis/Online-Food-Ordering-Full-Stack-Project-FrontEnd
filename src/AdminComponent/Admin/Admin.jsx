import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/RestaurantDashboard'
import Orders from '../Orders/Orders'
import Menu from '../Menu/Menu'
import FoodCategory from '../Food Category/FoodCategory'
import Events from '../Events/Events'
import RestaurantDetails from './RestaurantDetails'
import Ingredients from '../Ingredients/Ingredients'
import RestaurantDashboard from '../Dashboard/RestaurantDashboard'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById, getRestaurantsCategory } from '../../component/State/Restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action'
import { fetchRestaurantOrders } from '../../component/State/Restaurant Order/Action'

const Admin = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const { restaurant } = useSelector((store) => store)
    const restaurantId = restaurant.userRestaurants?.id

    useEffect(() => {
        if (restaurantId) {
            // Fetch restaurant categories
            dispatch(getRestaurantsCategory({
                jwt,
                restaurantId
            }))

            // Fetch restaurant orders
            dispatch(fetchRestaurantOrders({
                jwt,
                restaurantId,
            }))

            // You might want to add these too
            //dispatch(getMenuItemsByRestaurantId({ restaurantId, jwt }))
            //dispatch(getRestaurantById({ restaurantId, jwt }))
        }
    }, [restaurantId, jwt])

    const handleClose = () => {}

    return (
        <div>
            <div className='lg:flex justify-between'>
                <div>
                    <AdminSideBar handleClose={handleClose}/>
                </div>

                <div className='lg:w-[80%]'>
                    <Routes>
                        <Route path='/' element={<RestaurantDashboard/>} />
                        <Route path='/orders' element={<Orders/>} />
                        <Route path='/menu' element={<Menu/>} />
                        <Route path='/category' element={<FoodCategory/>} />
                        <Route path='/event' element={<Events/>} />
                        <Route path='/Ingredients' element={<Ingredients/>} />
                        <Route path='/details' element={<RestaurantDetails/>} />
                        <Route path='/add-menu' element={<CreateMenuForm/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Admin