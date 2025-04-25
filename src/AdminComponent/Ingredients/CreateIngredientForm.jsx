import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from '../../component/State/Ingredients/Action'

const CreateIngredientForm = () => {
    const { restaurant, ingredients } = useSelector((store) => store)
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const restaurantId = restaurant.userRestaurants?.id;
    
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        restaurantId: restaurantId
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert("Please enter an ingredient name");
            return;
        }

        const data = {
            name: formData.name,
            categoryId: formData.categoryId,
            restaurantId: restaurantId
        };
        
        console.log("Sending data:", data);
        dispatch(createIngredient({ data, jwt }));
        
        // Reset form after submission
        setFormData({
            name: "",
            categoryId: "",
            restaurantId: restaurantId
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className='p-5'>
            <h1 className='space-y-5 text-gray-400 text-center text-xl pb-10'>
                Create Ingredient
            </h1>

            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label='Ingredient Name'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                        required
                    />

                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="categoryId"
                            value={formData.categoryId}
                            label="Category"
                            onChange={handleInputChange}
                            name='categoryId'
                            required
                        >
                            {ingredients.category?.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                                transition: 'all 0.2s',
                                boxShadow: 2,
                                borderRadius: 1
                            }}
                        >
                            Create Ingredient
                        </Button>
                    </Box>
                </Box>
            </form>
        </div>
    )
}

export default CreateIngredientForm