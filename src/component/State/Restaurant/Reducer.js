import { use } from 'react';
import * as actionTypes from './ActionTypes';

const initialState = {
    restaurants: [],
    userRestaurants: [],
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantEvents: [],
    categories: [],
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANT_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading: false,
                usersRestaurants:action.payload,
            };

        case actionTypes.GET_ALL_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading: false,
                restaurants: action.payload,
            };  
            
        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
            };    
         
        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                userRestaurants: action.payload,
            };    

        case actionTypes.DELETE_RESTAURANT_SUCCESS:   
            return {
                ...state,
                loading: false,
                userRestaurants: state.userRestaurants.filter(
                    (item) => item.id !== action.payload
                ),
                userRestaurants: state.userRestaurants.filter(
                    (item) => item.id !== action.payload
                ),
            }; 

         case actionTypes.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantEvents: [...state.restaurantEvents, action.payload],
            };
        
            
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
            };
        
        case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    restaurantEvents: action.payload,
                };
        case actionTypes.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter(
                    (item) => item.id !== action.payload),
                restaurantEvents: state.restaurantEvents.filter(
                    (item) => item.id !== action.payload),
            };
        
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        
        case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        
        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANT_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    };
}

export default restaurantReducer;           