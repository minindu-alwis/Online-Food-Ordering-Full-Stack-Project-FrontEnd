import {api} from '../../../config/api';

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



export const getAllIngredientsOfRestaurant = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("all ingredients of restaurant", data);
            dispatch({ type: GET_INGREDIENTS, payload: response.data });
        } catch (error) {
            console.log("all ingredients of restaurant error", error);
        }
    };
}

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
export const createIngredientCategory = ({data,jwt}) => {
    console.log("create ingredient category",data,"jwt",jwt);
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

export const getIngredientCategory = ({id,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get ingredient category", response.data);
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("get ingredient category error", error);
            dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
        }
    };
}


export const updateStock = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const {data} = await api.put(`/api/admin/ingredients/${id}/stock`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_STOCK, payload: data });
            
            console.log("updated stock", response.data);
        } catch (error) {
            console.log("updated stock error", error);
        }
    };
}