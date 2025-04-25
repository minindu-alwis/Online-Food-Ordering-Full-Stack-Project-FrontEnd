import { api } from "../../config/api";
import { 
    CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAILURE, 
    GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_ALL_RESTAURANT_FAILURE, 
    DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, 
    UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_SUCCESS, UPDATE_RESTAURANT_FAILURE, 
    GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, 
    GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, 
    UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_STATUS_FAILURE, 
    CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE, 
    GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_EVENTS_FAILURE, 
    DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE, 
    GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, 
    CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE, 
    GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE 
  } from "./ActionType";


export const getAllRestaurantsAction = (token) =>{
    return async (dispatch) =>{
        dispatch({type:GET_ALL_RESTAURANT_REQUEST});
        try {
            const {data} = await api.get("/api/restaurant",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            });
            dispatch({type:GET_ALL_RESTAURANT_SUCCESS,payload:data});
            console.log("all restaurant",data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_ALL_RESTAURANT_FAILURE,payload:error});
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try {
            const response = await api.get(`/api/restaurant/${reqData.restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
            console.log("restaurant by id", response.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error});
        }
    }
}


export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try {
            const response = await api.get(`/api/admin/restaurants/user`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:response.data});
            console.log("restaurant by user id", response.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error.message});
        }
    }
}


export const createRestaurant = (reqData) => {
    console.log("token----------",reqData.token);
    return async (dispatch) => {
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try {
            const {data} = await api.post("/api/admin/restaurants",reqData.data,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`,
                },
            });

            dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:data});
            console.log("restaurant created",data);
            
        } catch (error) {
            console.log("catch error restaurent",error);
            dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error});
        }
    }


}


export const updateRestaurant = ({restaurantId,restaurantData,jwt}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try {
            const res = await api.put(`/api/admin/restaurant/${restaurantId}`,restaurantData,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:res.data});
            console.log("restaurant updated", res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error});
        }
    }
}

export const deleteRestaurant = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try {
            const res = await api.delete(`/api/admin/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:restaurantId});
            console.log("restaurant deleted", res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:DELETE_RESTAURANT_FAILURE,payload:error});
        }
    }
}

export const updateRestaurantStatus = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});
        try {
            const res = await api.put(`/api/admin/restaurants/update/${restaurantId}/status`,{},{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS,payload:res.data});
            console.log("restaurant status updated", res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE,payload:error});
        }
    }
}

export const createEventAction = ({data,jwt,restaurantId}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_EVENT_REQUEST});
        try {
            const res = await api.post(`/api/admin/events/restaurant/${restaurantId}`,data,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:CREATE_EVENT_SUCCESS,payload:res.data});
            console.log("event created",data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_EVENT_FAILURE,payload:error});
        }
    }
}

export const getAllEvents = ({jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try {
            const res = await api.get(`/api/events`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:GET_ALL_EVENTS_SUCCESS,payload:res.data});
            console.log("all events",res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_ALL_EVENTS_FAILURE,payload:error});
        }
    }
}


export const deleteEventAction = ({eventId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_EVENT_REQUEST});
        try {
            const res = await api.delete(`/api/admin/events/${eventId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:DELETE_EVENT_SUCCESS,payload:eventId});
            console.log("event deleted",res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:DELETE_EVENT_FAILURE,payload:error});
        }
    }
}


export const getRestaurantsEvents = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
        try {
            const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS,payload:res.data});
            console.log("restaurant events",res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE,payload:error});
        }
    }
}

export const createCategoryAction = ({reqData,jwt}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try {
            const res = await api.post(`/api/admin/category`,reqData,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:CREATE_CATEGORY_SUCCESS,payload:res.data});
            console.log("category created",res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
        }
    }
}

export  const getRestaurantsCategory = ({jwt,restaurantId}) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        try {
            const res = await api.get(`/api/category/restaurant/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });

            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS,payload:res.data});
            console.log("restaurant category",res.data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE,payload:error});
        }
    }
}