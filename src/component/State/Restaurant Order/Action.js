import axios from "axios";

import { 
    GET_RESTAURANTS_ORDER_REQUEST, 
    GET_RESTAURANTS_ORDER_SUCCESS, 
    GET_RESTAURANTS_ORDER_FAILURE, 
    UPDATE_ORDER_STATUS_REQUEST, 
    UPDATE_ORDER_STATUS_SUCCESS, 
    UPDATE_ORDER_STATUS_FAILURE 
} from './ActionType';
import { api } from "../../config/api";



export const updateOrderStatus = ({orderId, orderStatus,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST});
        try {
            const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            const updateOrder=response.data;
            console.log("updated order status",updateOrder);
            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:updateOrder});
        } catch (error) {
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE,payload:error});
        }
    }
}

export const fetchRestaurantOrders = ({ restaurantId, orderStatus, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/order/restaurant/${restaurantId}`,
                {
                    params: { order_status: orderStatus },
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );
            console.log("restaurant orders", data);
            dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.log("fetchRestaurantOrders error", error);
            dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.message });
        }
    };
};
