import axios from "axios";
import { api, API_URL } from "../../config/api";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_LOGIN_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST});
    try {
       const {data}=await axios.post(`${API_URL}/auth/signup`,reqData.userData);
        if(data.jwt)localStorage.setItem('jwt',data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurants");
        }
        else{
            reqData.navigate("/");
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt});
        console.log("Register success",data);

    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error});
       console.log("error",error);
       
    }

}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        
        if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            // Store the JWT in Redux state too
            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt }); // Only store JWT string
        }

        // Navigation logic
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants");
        } else {
            reqData.navigate("/");
        }

        // Now fetch user profile with the JWT
        dispatch(getUser(data.jwt));

    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        console.error("Login error:", error);
    }
}

export const getUser = () => async (dispatch, getState) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        // Get JWT from Redux state first, fallback to localStorage
        const { jwt } = getState().auth;
        const token = jwt || localStorage.getItem('jwt');
        
        if (!token) {
            throw new Error("No JWT token available");
        }

        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: GET_USER_SUCCESS, payload: data });

    } catch (error) {
        console.error("Profile fetch error:", error.response?.data || error.message);
        dispatch({ 
            type: GET_USER_FAILURE, 
            payload: error.response?.data?.message || error.message 
        });
        
        // Optional: Clear invalid token
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('jwt');
        }
    }
}


export const addToFavorite=({jwt,restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST});
    try {
       const {data}=await api.put(`/api/restaurant/${restaurantId}/add-favorites`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
       });
       
    
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data});
        console.log("added to favourite",data);
        

    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error});
       console.log("error",error);
       
    }

}




export const logout=()=>async(dispatch)=>{
   
    try {

        localStorage.clear();
      
        dispatch({type:LOGOUT});
        console.log("log out succsess");
        

    } catch (error) {
       console.log("error",error);
       
    }

}