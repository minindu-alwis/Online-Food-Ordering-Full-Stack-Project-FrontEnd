

import { api } from '../../config/api';
import { 
    GET_INGREDIENTS,
    UPDATE_STOCK,
    CREATE_INGREDIENT_REQUEST, 
    CREATE_INGREDIENT_SUCCESS, 
    CREATE_INGREDIENT_FAILURE, 
    CREATE_INGREDIENT_CATEGORY_REQUEST, 
    CREATE_INGREDIENT_CATEGORY_SUCCESS, 
    CREATE_INGREDIENT_CATEGORY_FAILURE, 
    GET_INGREDIENT_CATEGORY_REQUEST, 
    GET_INGREDIENT_CATEGORY_SUCCESS, 
    GET_INGREDIENT_CATEGORY_FAILURE 
} from './ActionType';

export const getAllIngredientsOfRestaurant = ({id, jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("all ingredients of restaurant", response.data);
            dispatch({ type: GET_INGREDIENTS, payload: response.data });
        } catch (error) {
            console.log("all ingredients of restaurant error", error);
            // You might want to dispatch an error action here
        }
    };
};

export const createIngredient = ({data,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_REQUEST });
        try {
            const response = await api.post('/api/admin/ingredients', data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("created ingredient", response.data);
            dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("created ingredient error", error);
            dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
        }
    }
}
export const createIngredientCategory = ({data, jwt}) => {
    console.log("create ingredient category", data, "jwt", jwt);
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.post('/api/admin/ingredients/category', data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("created ingredient category", response.data);
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("created ingredient category error", error);
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
        }
    }
}
export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Ingredient categories fetched:", data);
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
        } catch (error) {
            console.error(
                "Failed to fetch ingredient categories:",
                error.response?.data || error.message
            );
            dispatch({
                type: GET_INGREDIENT_CATEGORY_FAILURE,
                payload: error.response?.data || "Invalid token or server error",
            });
        }
    };
};

export const updateStock = ({ inId, jwt }) => {
    return async (dispatch) => {
      try {
        // Optimistic update - immediately reflect the change in UI
        dispatch({ 
          type: UPDATE_STOCK, 
          payload: { inId } // Just send the ID to toggle status
        });
  
        const { data } = await api.put(
          `/api/admin/ingredients/${inId}/stock`, 
          null, // Better than empty object
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json'
            }
          }
        );
  
        console.log("Stock updated successfully:", data);
        
      } catch (error) {
        console.error("Stock update failed:", error);
        
        // Revert the optimistic update on failure
        dispatch({ 
          type: UPDATE_STOCK, 
          payload: { inId, error: true } 
        });
      }
    };
  };