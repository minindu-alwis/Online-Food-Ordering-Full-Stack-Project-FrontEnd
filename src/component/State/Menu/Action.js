


import { api } from "../../config/api";
import { 
    CREATE_MENU_ITEM_REQUEST, 
    CREATE_MENU_ITEM_SUCCESS, 
    CREATE_MENU_ITEM_FAILURE, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, 
    DELETE_MENU_ITEM_REQUEST, 
    DELETE_MENU_ITEM_SUCCESS, 
    DELETE_MENU_ITEM_FAILURE, 
    SEARCH_MENU_ITEM_REQUEST, 
    SEARCH_MENU_ITEM_SUCCESS, 
    SEARCH_MENU_ITEM_FAILURE, 
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, 
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, 
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE 
  } from "./ActionType";
  

  export const createMenuItem = (menu,jwt) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_MENU_ITEM_REQUEST });
      try {
        const {data} = await api.post("api/admin/food", menu, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("created menu",data);
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload:data });
      } catch (error) {
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
      }
    };
  }

  export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
      try {
        const { data } = await api.get(
          `api/food/restaurant/${reqData.restaurantId}?vagetarian=${reqData.vagetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
          {
            headers: {
              Authorization: `Bearer ${reqData.jwt}`,
            },
          }
        );
        console.log("menu items by restaurant", data);
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
      } catch (error) {
        console.log("menu items by restaurant error", error);
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
      }
    };
  };
  


  export const searchMenuItem = ({keyword,jwt}) =>{
    return async(dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data}=await api.get(`api/food/search?name=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("search menu",data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});
            console.log("search menu item error",error);
        }
    }
  }

  export const getAllIngredientsOfMenuItem = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
      try {
        const { data } = await api.get(`api/food/restaur/${reqData.menuItemId}`, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        console.log("get menu",data);
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
      }
    };
  }   


export const updateMenuItemsAvailability = ({foodId,jwt}) =>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data}=await api.put(`api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("update menu item avallibability",data);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error});
            console.log("update menu item error",error);
        }
    }
}

export const deleteFoodAction = ({foodId,jwt}) =>{
    return async(dispatch)=>{
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try {
            const {data}=await api.delete(`api/admin/food/${foodId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("delete menu item",data);
            dispatch({type:DELETE_MENU_ITEM_SUCCESS,payload:foodId});
        } catch (error) {
            dispatch({type:DELETE_MENU_ITEM_FAILURE,payload:error});
            console.log("delete menu item error",error);
        }
    }
}